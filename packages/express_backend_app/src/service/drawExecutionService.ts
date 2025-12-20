import type { Spawn, PathModule } from "./types/nodeTypes.ts";

exports.executeCodeContainer = async (spawn: Spawn, path: PathModule, codeLanguage: string) => {
    // start the code respective container using dockercompose - which then
    // runs the container with bindmount of the sandbox/c or js, then reads the 
    // content in it & execute the code and then write the solution/error in the 
    // container fs. 
    let stderrChunks: Buffer[] = [];
    let stdoutChunks: Buffer[] = [];
    let stderr: string;
    let stdout: string;
    
    try {
        return await new Promise<string>((res, rej) => {


            if (codeLanguage === "c") {

                const cDockerDir = path.join(__dirname, '../../../../compilers/c/');
                const dockercomposeProcess = spawn(
                    'docker',
                    ['compose', 'run', '--rm', 'c-compiler'], // remove container after it runs
                    { cwd: cDockerDir }
                );
                dockercomposeProcess.on('error', (err) => {
                    console.log("dockercomposeProcess failed to start");
                    rej(err);
                })
                dockercomposeProcess.stderr.on('data', (data) => {
                    //get piped from docker cli, because, the err in the docker 
                    // container process is piped to docker cli 
                    console.log("docker cli's stderr being collected ...");
                    stderrChunks.push(data);
                })
                dockercomposeProcess.stdout.on('data', (data) => {
                    //get piped from docker cli, because, the stdout in the docker 
                    // container process is piped to docker cli 
                    console.log("docker cli's stdout being collected ... ");
                    stdoutChunks.push(data);
                })
                dockercomposeProcess.on('close', (code) => {
                    // exit code always get piped from the docker engine to docker cli program
                    if (code !== 0) {
                        // The process inside the container ran with error
                        //
                        if (code === 1) {
                            //compile error 
                            //so copy the err.txt from container fs
                            console.log("compilation error");
                            // cli outs would be encoded in utf-8
                            stderr = Buffer.concat(stderrChunks).toString('utf-8');
                            res(stderr);
                        } else if (code === 2) {
                            //user's code runtime error
                            //so copy the cApp from container fs
                            console.log("user's code runtime error");
                            stderr = Buffer.concat(stderrChunks).toString('utf-8');
                            res(stderr);
                        }
                    } else {
                        //user's code ran good
                        //so copy the cApp from container fs
                        console.log("Good code");
                        // warnings which are stderr chunks are ignored
                        stdout = Buffer.concat(stdoutChunks).toString('utf-8');
                        res(stdout);
                    }

                })

            } else if (codeLanguage = "js") {
                const jsDockerDir = path.join(__dirname, '../../../../compilers/js/');
                const dockercomposeProcess = spawn(
                    'docker',
                    ['compose', 'run', '--rm', 'js-compiler'], // remove container after it runs
                    { cwd: jsDockerDir }
                );
                dockercomposeProcess.on('error', (err) => {
                    console.log("dockercomposeProcess failed to start");
                    rej(err);
                })
                dockercomposeProcess.stderr.on('data', (data) => {
                    //get piped from docker cli, because, the err in the docker 
                    // container process is piped to docker cli 
                    console.log("docker cli's stderr being collected ...");
                    stderrChunks.push(data);
                })
                dockercomposeProcess.stdout.on('data', (data) => {
                    //get piped from docker cli, because, the stdout in the docker 
                    // container process is piped to docker cli 
                    console.log("docker cli's stdout being collected ... ");
                    stdoutChunks.push(data);
                })
                dockercomposeProcess.on('close', (code) => {
                    // exit code always get piped from the docker engine to docker cli program
                    if (code !== 0) {
                        // The process inside the container ran with error
                        //user's code runtime error
                        console.log("user's code runtime error");
                        stderr = Buffer.concat(stderrChunks).toString('utf-8');
                        res(stderr);
                    } else {
                        //user's code ran good
                        //so copy the cApp from container fs
                        console.log("Good code");
                        // warnings which are stderr chunks are ignored
                        stdout = Buffer.concat(stdoutChunks).toString('utf-8');
                        res(stdout);
                    }

                })

            }
        })

    } catch (err) {
        console.log("Docker compose error: ", err);
        throw err;
    }

}
