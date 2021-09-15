import Controller from "../core/webserver/Controller";
import {Context} from "koa";
import JSONObject from "../core/interfaces/JSONObject";
import * as nodeHtmlToImage from "node-html-to-image";


@Controller.HTTPController("/render")
class PulseController extends Controller {
    @Controller.Route("GET", "/")
    public async render(ctx: Context): Promise<void> {
        const text: string = ctx.request.body?.text || "";

        // @ts-ignore
        nodeHtmlToImage({
            output: "./image.png",
            html: text,
        }).then(() => console.log("The image was created successfully!"));


        ctx.body = {
            application: "html-to-image-service",
            version: "UNKNOWN",
        };
    }

}

export default PulseController;