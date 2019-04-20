import {Context} from 'koa';
import {MiddlewareFunction} from '../types';
import {errorResponse} from '../util/responseCreator';

export const authenticated = (ctx: Context, next: MiddlewareFunction) => {
    if (ctx.isAuthenticated()) {
        return next();
    } else {
        ctx.status = 401;
        return ctx.body = errorResponse(new Error('Not authenticated'));
    }
};
