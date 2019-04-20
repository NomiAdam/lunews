import { Context } from 'koa';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const USER_CONTROLLER = 'user-get';

export const logoutUser = async (ctx: Context) => {
    try {
        ctx.logout();
        return ctx.body = successResponse(true);
    } catch (e) {
        Log.insertNewLog({ method: 'logoutUser', controller: USER_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
