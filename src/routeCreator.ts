import fs from 'fs';
import path from 'path';
import {compose, includes, init, join, not, split, map, toUpper, tail, equals, ifElse, always, identity} from 'ramda';
import defaultMiddleware from './middlewares';
import Router from 'koa-router';
import { IRouteOptions, IControllerDefinition } from './interfaces';

const splitBySlash = split('/');
const joinWithSlash = join('/');
const joinWithRight = join(' > ');
const equalsSlash = equals('/');

// @ts-ignore
const composePath = compose(joinWithSlash, init, splitBySlash);

// @ts-ignore
const composeKeyName = compose(joinWithRight, tail, map(toUpper), init, splitBySlash);

const returnValidPathEnding = ifElse(equalsSlash, always(''), identity);

const routes: any = {};

const browseControllerObject = (controllerDefinition: IControllerDefinition, controllerPath: string) => {
    const keyName: string = composeKeyName(controllerPath);
    routes[keyName] = [];
    for (const actionName in controllerDefinition) {
        if (actionName !== 'default') {
            break;
        }
        const actionObject = controllerDefinition[actionName];
        for (const routePath in actionObject) {
            const routeSlug = path.join(composePath(controllerPath), returnValidPathEnding(routePath));
            for (const routeMethod in actionObject[routePath]) {
                routes[keyName].push({
                    action: actionObject[routePath][routeMethod].action,
                    level: actionObject[routePath][routeMethod].level,
                    method: routeMethod,
                    middlewares: actionObject[routePath][routeMethod].middlewares,
                    path: routeSlug,
                    permissions: 'public',
                    verb: routePath,
                });
            }
        }
    }
};

const includesRouting = includes('.routing');
const notIncludesRouting = compose(not, includesRouting);

const browseDirectory = (directoryPath: string, urlPrefix: string, preURL: string) => {
    fs.readdirSync(directoryPath)
        .forEach((file) => {
            const curtFilePath = path.join(directoryPath, file);
            const stats = fs.statSync(curtFilePath);
            if (stats.isDirectory()) {
                return browseDirectory(curtFilePath, path.join(urlPrefix, file), preURL);
            }
            const realCtrlName = file.substr(0, file.length - 3);
            const controller = require(path.join(directoryPath, realCtrlName));
            if (notIncludesRouting(realCtrlName)) {
                return false;
            }
            const controllerPath = path.join('/', preURL, urlPrefix, realCtrlName);
            return browseControllerObject(controller, controllerPath);
        });
};

const generateRoutes = (router: Router): void => {
    for (const i in routes) {
        console.log(`\n[${i}]`);
        for (const j in routes[i]) {
            console.log(routes[i][j]);
            (<any>router)[routes[i][j].method](routes[i][j].path, ...routes[i][j].middlewares || defaultMiddleware, routes[i][j].action);
        }
    }
};

export default (router: Router, options: IRouteOptions): void => {
    if (!router) {
        throw new Error('Expected an Koa router as first argument');
    }
    console.log('\n======== ROUTES ========');
    browseDirectory(options.controllersPath, '/', options.preURL);
    generateRoutes(router);
    console.log('\n========================');
};
