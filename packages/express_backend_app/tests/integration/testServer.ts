import { Server } from "http";
import app from "../../src/app.js";


export const startServer = (testport: number): Promise<Server> => {

    return new Promise<Server>((res, rej) => {
    const testServer = app.listen(testport, () => {
        console.log("Test backend running at port:", testport)
        res(testServer);
    })
})
    .then(startedServer => {
        return startedServer;
    })
}
