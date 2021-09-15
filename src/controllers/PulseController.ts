import Controller from "../core/webserver/Controller";
import {Context} from "koa";
import JSONObject from "../core/interfaces/JSONObject";

@Controller.HTTPController("")
class PulseController extends Controller {
    private static StatusesValues = {
        stopped: 0,
        idle: 100,
        running: 200,
    };

    @Controller.Route("GET", "/pulse")
    public async pulse(ctx: Context): Promise<void> {
        ctx.body = {
            application: "html-to-image-service",
            version: "UNKNOWN",
        };
    }

}

export default PulseController;