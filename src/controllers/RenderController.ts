import Controller from "../core/webserver/Controller";
import {Context} from "koa";
import * as nodeHtmlToImage from "node-html-to-image";


@Controller.HTTPController("/render")
class PulseController extends Controller {
    @Controller.Route("GET", "/")
    public async render(ctx: Context): Promise<void> {
        const text: string = ctx.request.body?.text || "";

        // @ts-ignore
        const image = await nodeHtmlToImage({
            html: text,
        });

        ctx.res.writeHead(200, {'Content-Type': 'image/png'})
        ctx.res.end(image, 'binary');
    }

}

export default PulseController;