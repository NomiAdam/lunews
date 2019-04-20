import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import send from 'koa-send';
import serve from 'koa-static';
import createRoutes from './routeCreator';
import ScheduleController from './scheduler/controllers/ScheduleController';
import path from 'path';
import session from 'koa-session';
import passport from 'koa-passport';
import logger from 'koa-logger';
import PassportGoogleService from './services/passport';
import { keys } from './config/keys';
import { MiddlewareFunction } from './types';
import GroupSeeder from './database/seed/seedGroups';

export default class App {

    public static bootstrap(): App {
        return new App();
    }

    public app: Koa;
    private readonly router: Router;
    private readonly passportService: PassportGoogleService;

    constructor() {
        this.app = new Koa();

        this.router = new Router();

        this.passportService = new PassportGoogleService(this.router);
        this.passportService.useGoogleAuth();

        this.initDefaultConfig();
        this.routes();
        this.initStatic();
        App.initSeed();
        App.initSchedulers();
    }

    private static initSeed(): void {
        GroupSeeder.withoutBar().then(() => console.log('Group seeded')).catch(console.log);
    };

    private static initSchedulers(): void {
        new ScheduleController().databaseScheduler();
    };

    private initDefaultConfig(): void {
        this.app.keys = [keys.cookieKey];
        this.app.use(logger());
        this.app.use(session({}, this.app));
        this.app.use(bodyParser());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initStatic(): void {
        const staticDirectoryRoot: string = <string>process.env.STATIC_PATH || './client/build';
        this.app.use(serve(staticDirectoryRoot));
        this.app.use(async (ctx: Context, next: MiddlewareFunction) => {
            await send(ctx, __dirname + '/index.html');
            await next();
        });
    }

    private routes(): void {

        this.app.use(async (ctx: Context, next: MiddlewareFunction) => {
            try {
                await next();
            } catch (error) {
                console.log('Error');
                console.error(error);
                ctx.status = error.status || 500;
                ctx.body = error.message;
                // @ts-ignore
                ctx.app.emit('error', error, ctx);
            }
        });

        this.passportService.defineGoogleAuthRouter();

        createRoutes(this.router, {
            controllersPath: path.join(__dirname, "controllers"),
            preURL: "api/v3",
        });

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }

}
