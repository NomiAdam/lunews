import {Context} from 'koa';
import {getConnectionInstance} from '../../services/nntp';
import { MessageTreeNode } from 'entepe';
import Read from '../../model/Read';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const TREE_CONTROLLER = 'tree-get';

export const getTree = async (ctx: Context) => {
    const {group} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const articleNumbers = await connection.listGroupArticles(group);
        const lengthMinusOne: number = articleNumbers.length - 1;
        const groupInformation = await connection.getGroup(group);
        const tree: MessageTreeNode = await connection.overRange(
            articleNumbers[0],
            articleNumbers[lengthMinusOne],
        );
        await connection.quit();
        tree.removeInvalidNodes();
        const keys = tree.getTreeKeys();
        const test = await Read.getReadList(1, keys);
        return ctx.body = successResponse(
            {tree: tree.getAllChildren(), threadCount: groupInformation.numberOfArticles, read: test},
        );
    } catch (e) {
        Log.insertNewLog({method: 'getTree', controller: TREE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getTreeSub = async (ctx: Context) => {
    const {group, quantity } = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const articleNumbers = await connection.listGroupArticles(group);
        const groupInformation = await connection.getGroup(group);
        const lengthMinusOne: number = articleNumbers.length - 1;
        const parserQuantity: number = parseInt(quantity, 0);
        let validStart = lengthMinusOne - parserQuantity;
        if (validStart < 0) {
            validStart = 0;
        } else if (validStart > lengthMinusOne) {
            validStart = lengthMinusOne;
        }
        const tree: MessageTreeNode = await connection.overRange(
            articleNumbers[validStart],
            articleNumbers[lengthMinusOne],
        );
        await connection.quit();
        tree.removeInvalidNodes();
        const keys = tree.getTreeKeys();
        const test = await Read.getReadList(1, keys);
        return ctx.body = successResponse(
            {tree: tree.getAllChildren(), threadCount: groupInformation.numberOfArticles, read: test},
        );
    } catch (e) {
        Log.insertNewLog({method: 'getTreeSub', controller: TREE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getRegexTree = async (ctx: Context) => {
    const {group, pattern} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const groupInformation = await connection.getGroup(group);
        const {tree, nodeCount} = await connection.overRangeRegex(
            groupInformation.firstArticleNumber,
            groupInformation.lastArticleNumber,
            0,
            50,
            pattern,
        );
        await connection.quit();
        tree.removeInvalidNodes();
        const keys = tree.getTreeKeys();
        const test = await Read.getReadList(1, keys);
        return ctx.body = successResponse({tree: tree.getAllChildren(), threadCount: nodeCount, read: test});
    } catch (e) {
        Log.insertNewLog({method: 'getRegexTree', controller: TREE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
