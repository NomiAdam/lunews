import { Context } from 'koa';
import { MiddlewareFunction } from '../types';

export default (ctx: Context, next: MiddlewareFunction) => next();
