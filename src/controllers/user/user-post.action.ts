import { Context } from 'koa';
import User from '../../model/User';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const USER_CONTROLLER = 'user-post';

export const loginUser = async (ctx: Context) => {
    try {
        const {name, password} = ctx.request.body as { name: string, password: string };
        // @ts-ignore
        const token = token;
        return ctx.body = successResponse(token);
    } catch (e) {
        Log.insertNewLog({ method: 'loginUser', controller: USER_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const registerUser = async (ctx: Context) => {
    try {
        const { name, email, password } = ctx.request.body as  { name: string, password: string, email: string };
        const hashedPassword: any = password;
        await User.createUser(name, email, hashedPassword);
        return ctx.body = successResponse('Successfully registered');
    } catch (e) {
        Log.insertNewLog({ method: 'registerUser', controller: USER_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
