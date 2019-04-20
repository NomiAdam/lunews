import { Context } from 'koa';
import { MessageTreeNode } from 'entepe';
import Star from '../../model/Star';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const STAR_CONTROLLER = 'star-get';

export const getStarredArticles = async (ctx: Context) => {
    const { group } = ctx.request.query;
    try {
        // const { id } = ctx.state.user;
        const rootMessageTree = new MessageTreeNode();
        const list = await Star.getStarList(1, group);
        for (const starred of list) {
            rootMessageTree.insertMessageInfo(starred);
        }
        const threadCount: number = await Star.getStarListCount(1, group);
        rootMessageTree.removeInvalidNodes();
        return ctx.body = successResponse({
            threadCount,
            tree: rootMessageTree.getAllChildren(),
        });
    } catch (e) {
        Log.insertNewLog({ method: 'getStarredArticles', controller: STAR_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
