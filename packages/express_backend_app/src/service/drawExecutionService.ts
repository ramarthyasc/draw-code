import type { Spawn, PathModule } from "./types/nodeTypes.ts";

interface IExecutionResult {
    id: number;
    pass: boolean;
    input: string;
    userOutput: string;
    expOutput: string;
}
type UserLog = string;
type CaseItems = IExecutionResult | UserLog;
type EachCaseResult = CaseItems[][];
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
        return await new Promise<string | EachCaseResult>((res, rej) => {


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
                    //
                    // Removing docker's warnings and removing unwanted information
                    let chunk = data.toString();
                    if (
                        !(chunk.includes('Container') ||
                            chunk.includes('Creating') ||
                            chunk.includes('Created'))
                    ) {
                        chunk = chunk.replace(/\sat/g, "<br> at");
                        data = Buffer.from(chunk, 'utf-8');

                        if (chunk.includes('main')) {
                            // replace the path containing main - with just main
                            chunk = chunk.replace(/.(\/[a-z]+)+\/main/g, 'main');
                            data = Buffer.from(chunk, 'utf-8');
                        }

                        console.log("docker cli's stderr being collected ...");
                        stderrChunks.push(data);
                        return;
                    }
                    console.log("docker cli's stderr not collected ...");
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
                    //
                    // Removing docker's warnings and removing unwanted information
                    let chunk = data.toString();
                    if (
                        !(chunk.includes('Container') ||
                            chunk.includes('Creating') ||
                            chunk.includes('Created'))
                    ) {
                        chunk = chunk.replace(/\sat/g, "<br> at");
                        data = Buffer.from(chunk, 'utf-8');

                        if (chunk.includes('main')) {
                            // replace the path containing main - with just main
                            chunk = chunk.replace(/(\/[a-z]+)+\/main/g, 'main');
                            data = Buffer.from(chunk, 'utf-8');
                        }

                        console.log("docker cli's stderr (piped from the container) being collected ...");
                        stderrChunks.push(data);
                        return;
                    }
                    console.log("docker cli's stderr ie; docker warnings not collected ...");
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

                        // stdout will contain a \n string too as we are doing console.log from container which 
                        // outputs a \n automatically. So split using \n
                        //Make it into an array, then send - then we get array of Objects
                        console.log(stdout);
                        // casestringArray contains strings - where each contains the userlogs & our resultobject log
                        const casestringArray: string[] = stdout
                            .split("_&&_@849\n") // random splitter - so that user logs can't split the string NOTE: BREAKPOINT
                            .filter((item) => {
                                return item !== "";
                            });
                        console.log(casestringArray);
                        // Make array of Arrays, where each array is a case - where we have userlogs and our resultobject
                        const caseArrayArray: EachCaseResult = casestringArray
                            .map((string: string) => {
                                return string
                                    .split("\n")
                                    .filter((item) => {
                                        return item !== "";
                                    })
                                    .map((str) => {
                                        try {
                                            return JSON.parse(str);
                                        } catch (err) {
                                            // for normal non parsable strings from user
                                            return str;
                                        }

                                    })
                            })
                        console.log(caseArrayArray);

                        res(caseArrayArray);
                    }

                })

            }
        })

    } catch (err) {
        console.log("Docker compose error: ", err);
        throw err;
    }

}
