const Joi = require("joi");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const { getLangConfig } = require("../utils/getLangConfig");
const { ensureImageExists, executeInDocker } = require("../utils/docker");
const shareModel = require("../models/share.model");

module.exports.runCode = async (req, res) => {

    const schema = Joi.object({
        code: Joi.string().required()
            .messages({
                "string.empty": "Code is required",
                "string.required": "Code is required",
                "any.required": "Code is required",
                "string.base": "Code must be a string",
                "string.min": "Code must be at least 1 character long",
            }),
        language: Joi.string().required()
            .messages({
                "string.empty": "Language is required",
                "string.required": "Language is required",
                "any.required": "Language is required",
                "string.base": "Language must be a string",
                "string.min": "Language must be at least 1 character long",
            }),
        input: Joi.string().allow('')
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { code: codeIn, language, input } = value;
    const code = JSON.parse(codeIn);

    const cfg = getLangConfig(language, !!input);
    if (!cfg) return res.status(400).json({ message: 'language not supported' });

    // Save code to a temp file
    const userId = uuidv4();
    const workdir = path.join(process.cwd(), "temp", userId);
    // create workdir
    fs.mkdirSync(workdir, { recursive: true });

    if (input) await fs.writeFile(path.join(workdir, 'input.txt'), input);


    // Security: Validate code for dangerous patterns
    const dangerousPatterns = [
        /require\s*\(\s*['"]child_process['"]\s*\)/gi,
        /require\s*\(\s*['"]fs['"]\s*\)/gi,
        /import\s+os/gi,
        /system\s*\(/gi,
        /eval\s*\(/gi,
        /__import__\s*\(\s*['"]os['"]\s*\)/gi,
        /Runtime\.getRuntime\(\)/gi,
        /ProcessBuilder/gi,
    ];

    const isCodeSafe = (code) => {
        for (const pattern of dangerousPatterns) {
            if (pattern.test(code)) {
                return false;
            }
        }
        return true;
    };

    if (!isCodeSafe(code)) {
        return res.status(400).json({ message: 'Code contains dangerous patterns' });
    }

    try {

        await fs.writeFile(path.join(workdir, cfg.filename), code);
        await ensureImageExists(cfg.image);
        const result = await executeInDocker(cfg, workdir);

        // Cleanup
        fs.removeSync(workdir);
        res.json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }

}

module.exports.shareCode = async (req, res) => {
    const schema = Joi.object({
        shareId: Joi.string(),
        userId: Joi.string(),
        language: Joi.string()
            .required().trim()
            .messages({
                "string.empty": "Language is required",
                "string.required": "Language is required",
                "any.required": "Language is required",
                "string.base": "Language must be a string",
            }),
        code: Joi.string().required()
            .min(1)
            .max(1000)
            .messages({
                "string.empty": "Code is required",
                "string.required": "Code is required",
                "any.required": "Code is required",
                "string.base": "Code must be a string",
                "string.min": "Code must be at least 1 character long",
                "string.max": "Code must be at most 1000 characters long",
            }),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { shareId, userId, language, code: mainCode } = value;
    const code = JSON.parse(mainCode);

    // language verify
    const cfg = getLangConfig(language, false);
    if (!cfg) return res.status(400).json({ message: 'language not supported' });

    try {

        if (shareId) {
            const share = await shareModel.findOne({ shareId });
            if (!share) return res.status(400).json({ message: 'Invalid share id' });
            share.code = code;
            share.language = language;
            await share.save();
            return res.status(200).json({
                message: 'Shared link generated successfully',
                shareId: share.shareId,
            });
        }

        // generate random id
        function generateShareId() {
            return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
        }

        const newShare = await shareModel.create({
            shareId: generateShareId(),
            language,
            code,
        });

        return res.status(200).json({
            message: 'Shared link generated successfully',
            shareId: newShare.shareId,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }

};

module.exports.getCodeById = async (req, res) => {
    const schema = Joi.object({
        shareId: Joi.string().required()
            .messages({
                "string.empty": "Share id is required",
                "string.required": "Share id is required",
                "any.required": "Share id is required",
                "string.base": "Share id must be a string",
            }),
    });

    const { error, value } = schema.validate(req.params);
    if (error) return res.status(400).send(error.details[0].message);
    const { shareId } = value;


    if (!shareId) return res.status(400).json({ message: 'Invalid share id' });

    try {
        const share = await shareModel.findOne({ shareId }).lean();
        if (!share) return res.status(400).json({ message: 'Invalid share id' });
        return res.status(200).json({
            message: 'success',
            shareId: share.shareId,
            language: share.language,
            code: share.code,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }


}