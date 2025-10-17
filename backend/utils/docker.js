
const Docker = require('dockerode');
const docker = new Docker();

module.exports.ensureImageExists = async (image) => {
    try {
        await docker.getImage(image).inspect();
        return;
    } catch (err) {
        console.log(`Pulling image ${image} ...`);
        await new Promise((resolve, reject) => {
            docker.pull(image, (pullErr, stream) => {
                if (pullErr) return reject(pullErr);
                docker.modem.followProgress(stream, (followErr) => followErr ? reject(followErr) : resolve());
            });
        });
        console.log(`${image} pulled`);
    }
};

module.exports.executeInDocker = async function executeInDocker(cfg, workdir) {

    const containerConfig = {
        Image: cfg.image,
        Cmd: cfg.runCmd,
        WorkingDir: '/app',
        HostConfig: {
            Memory: 128 * 1024 * 1024, // 128MB
            MemorySwap: 128 * 1024 * 1024,
            NanoCpus: 500000000, // 0.5 CPU
            PidsLimit: 50,
            Binds: [`${workdir}:/app`], // Read-only mount
            NetworkMode: 'none', // No network access
            ReadonlyRootfs: false, // Need write for compilation
            AutoRemove: true, // Auto cleanup
        },
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
    };

    let container;
    let output = '';
    let errorOutput = '';

    try {
        // Create container
        container = await docker.createContainer(containerConfig);
        // Start container
        await container.start();

        // Attach to container to get output
        const stream = await container.attach({
            stream: true,
            stdout: true,
            stderr: true
        });

        // Collect output
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                container.stop().catch(() => { });
                reject(new Error('Execution timeout'));
            }, 100 * 1000);

            stream.on('data', (chunk) => {
                const text = chunk.toString('utf8');
                output += text.slice(8);
                // // Docker multiplexes stdout/stderr, need to parse
                // if (chunk[0] === 1 || chunk[0] === 2) {
                //     output += text.slice(8); // stdout
                // } else if (chunk[0] === 3) {
                //     errorOutput += text.slice(8); // stderr
                // } else {
                //     output += text;
                // }
            });

            stream.on('end', () => {
                clearTimeout(timeout);
                resolve();
            });

            stream.on('error', (err) => {
                clearTimeout(timeout);
                reject(err);
            });
        });

        // Wait for container to finish
        await container.wait();

        return {
            success: !errorOutput,
            output: output || errorOutput || 'No output',
            error: !!errorOutput
        };

    } catch (error) {
        console.error(error);
        if (container) {
            await container.stop().catch(() => { });
            await container.remove().catch(() => { });
        }

        return {
            success: false,
            output: error.message,
            error: true
        };
    }

}