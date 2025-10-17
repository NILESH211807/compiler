module.exports.getLangConfig = (language, input) => {
    switch ((language || '').toLowerCase()) {
        case 'python':
            return {
                image: 'python:3.11',
                filename: 'main.py',
                runCmd: ['bash', '-lc', input ? 'python3 main.py < input.txt' : 'python3 main.py']
            };
        case 'node':
        case 'javascript':
            return {
                image: 'node:20',
                filename: 'main.js',
                runCmd: ['bash', '-lc', input ? 'node main.js < input.txt' : 'node main.js']
            };
        case 'cpp':
        case 'c++':
            return {
                image: 'gcc:latest',
                filename: 'main.cpp',
                runCmd: ['bash', '-c', 'g++ main.cpp -O2 -std=c++17 -o main && ./main']
            };
        case 'c':
            return {
                image: 'gcc:latest',
                filename: 'main.c',
                runCmd: ['bash', '-c', 'gcc main.c -O2 -o main && ./main']
            };
        case 'java':
            return {
                image: 'openjdk:21',
                filename: 'Main.java',
                runCmd: ['bash', '-c', 'javac Main.java && java Main']

            };
        case 'go':
            return {
                image: 'golang:latest',
                filename: 'main.go',
                runCmd: input ? ['sh', '-c', 'go run main.go < input.txt'] : ['go', 'run', 'main.go']
            };
        case 'rust':
            return {
                image: 'rust:latest',
                filename: 'main.rs',
                runCmd: input ? ['sh', '-c', 'rustc main.rs && ./main < input.txt'] : ['sh', '-c', 'rustc main.rs && ./main']
            };
        case 'php':
            return {
                image: 'php:latest',
                filename: 'main.php',
                runCmd: input ? ['sh', '-c', 'php main.php < input.txt'] : ['php', 'main.php']
            };
        default:
            return null;
    }
}