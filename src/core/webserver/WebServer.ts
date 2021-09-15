import * as Koa from "koa";
import {Context, Next} from "koa";
import * as Router from "koa-router";
import {Server} from "http";
import {Logger} from "../logger/Logger";
import HttpError from "../errors/HttpError";
import * as shutdown from "koa-graceful-shutdown";
import Destructable from "../interfaces/Destructable";
import Controller from "./Controller";
import * as BodyParser from "koa-bodyparser";

class WebServer extends Koa implements Destructable {
    protected readonly router: Router;
    public port: number;
    private session: Server | null;

    public constructor(config: WebServer.Config = {}) {
        super();
        this.session = null;
        this.router = new Router();
        this.port = config?.port || 22233;

        this.use(async (ctx: Context, next: Next) => await WebServer.httpErrorsMiddleware(ctx, next));
        this.use(BodyParser());

        const controllers = config.controllers || [];
        for (const controller of controllers) {
            this.router.use(controller.baseRoute, controller.routes(), controller.allowedMethods());
        }
        this.use(this.router.routes());
    }

    /**
     * httpErrorsMiddleware - middleware for handling HttpError.
     * @method
     * @param ctx - Koa HTTP context.
     * @param next - Next middleware.
     * @throws Error
     * @author Danil Andreev
     */
    public static async httpErrorsMiddleware(ctx: Context, next: Next): Promise<void> {
        try {
            await next();
        } catch (error) {
            if (error instanceof HttpError) {
                Logger?.debug(`Http Request error(${error.code}): ${error.message}`);
                ctx.status = error.code;
                ctx.body = error.getResponseMessage();
            } else {
                throw error;
            }
        }
    }

    /**
     * start - starts the server.
     * @method
     * @param port - Target port. If not defined - will be taken from env or config.
     * @author Danil Andreev
     */
    public async start(port?: number): Promise<WebServer> {
        await this.stopServer();
        const targetPort: number = port || this.port || 3030;
        Logger.info(`Web server started on port ${targetPort}.`);
        this.session = this.listen(targetPort);
        this.use(shutdown(this.session));
        return this;
    }

    protected stopServer(): Promise<WebServer> {
        return new Promise<WebServer>((resolve, reject) => {
            const session: Server | null = this.session;
            this.session = null;
            if (session) {
                session.close((error: Error) => {
                    if (error) reject(error);
                    resolve(this);
                });
            } else {
                resolve(this);
            }
        });
    }

    public async destruct(): Promise<void> {
        await this.stopServer();
    }
}

namespace WebServer {
    export interface Config {
        controllers?: Controller[];
        port?: number;
    }
}

export default WebServer;
