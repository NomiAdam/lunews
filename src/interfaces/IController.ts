import {Context} from 'koa';
import {MiddlewareFunction} from '../types';

export interface IControllerDefinition {
    verb: string;
    method: string;
    action: (ctx: Context, next?: MiddlewareFunction) => void;
    level: string;
    path: string;
    permissions: string;
    middlewares: MiddlewareFunction[];
    [key: string]: IControllerDefinition | any;
}
