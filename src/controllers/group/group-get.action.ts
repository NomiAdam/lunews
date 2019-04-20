import { Context } from 'koa';
import { getConnectionInstance } from '../../services/nntp';
import Favourite from '../../model/Favourite';
import Group from '../../model/Group';
import Read from '../../model/Read';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const GROUP_CONTROLLER = 'group-get';

export const listGroups = async (ctx: Context) => {
    try {
        const groupList = await Group.getGroupList();
        return ctx.body = successResponse(groupList);
    } catch (e) {
        Log.insertNewLog({ method: 'listGroups', controller: GROUP_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getGroup = async (ctx: Context) => {
    const {group} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const groupInformation = await connection.getGroup(group);
        await connection.quit();
        return ctx.body = successResponse(groupInformation);
    } catch (e) {
        Log.insertNewLog({ method: 'getGroup', controller: GROUP_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getGroupUnread = async (ctx: Context) => {
    try {
        const favouriteGroup = await Favourite.listFavourite(1);
        const groupCount: any = {};
        for ( const { name } of favouriteGroup ) {
            groupCount[name] = await Read.getGroupCount(name);
        }
        return ctx.body = successResponse(groupCount);
    } catch (e) {
        Log.insertNewLog({ method: 'getGroupUnread', controller: GROUP_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
