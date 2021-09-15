import WebServer from "./core/webserver/WebServer";
import PulseController from "./controllers/PulseController";
import RenderController from "./controllers/RenderController";


export default async function main(): Promise<void> {
    const server = new WebServer({
        controllers: [
            new PulseController(),
            new RenderController(),
        ],
    });
    await server.start(22233);
}
