const express = require('express');
const router = express.Router();
const compilerController = require('../controllers/compiler.controller');

router.post('/run', compilerController.runCode);
router.post('/share', compilerController.shareCode);
router.get('/share/:shareId', compilerController.getCodeById);

module.exports = router;