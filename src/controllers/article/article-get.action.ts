import {Context} from 'koa';
import {getConnectionInstance} from '../../services/nntp';
import { interfaces, MessageTreeNode } from 'entepe';
import Read from '../../model/Read';
import Star from '../../model/Star';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const ARTICLE_CONTROLLER = 'article-get';

export const getArticleInformation = async (ctx: Context) => {
    const { group, reference } = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const remoteArticle: interfaces.IMessageInfo | any = await connection.getArticleHead(reference);
        await connection.quit();
        const isStarred = await Star.getIsStarred(1, reference);
        await Read.addRead(1, reference, group);
        return ctx.body = successResponse({
            head: remoteArticle,
            starred: isStarred,
        });
    } catch (e) {
        console.log(e);
        Log.insertNewLog({method: 'getArticle', controller: ARTICLE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getArticleTree = async (ctx: Context) => {
    const {group, reference} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const remoteArticle: interfaces.IMessageInfo | any = await connection.getArticleHead(reference);
        const remoteReference = remoteArticle.reference.split(' ')[0].match(/<.*?>/g) ?
            remoteArticle.reference.split(' ')[0]
            :
            remoteArticle.globalID;
        const groupInformation = await connection.getGroup(group);
        const rootTree: MessageTreeNode = await connection.overRangeReference(
            groupInformation.firstArticleNumber,
            groupInformation.lastArticleNumber,
            remoteReference,
        );
        rootTree.removeInvalidNodes();
        const keys = rootTree.getTreeKeys();
        await connection.quit();
        const read = await Read.getReadList(1, keys);
        return ctx.body = successResponse({ tree: rootTree.getAllChildren(), read });
    } catch (e) {
        console.log(e);
        Log.insertNewLog({method: 'getArticleTree', controller: ARTICLE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getArticleBody = async (ctx: Context) => {
    const {reference} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const remoteArticleBody = await connection.getArticleBody(reference);
        await connection.quit();
        return ctx.body = successResponse({
            body: remoteArticleBody.html,
        });
    } catch (e) {
        Log.insertNewLog({method: 'getArticleBody', controller: ARTICLE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const getArticleAttachments = async (ctx: Context) => {
    const {reference} = ctx.request.query;
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const remoteArticleBody = await connection.getArticleBody(reference);
        await connection.quit();
        return ctx.body = successResponse({
            attachments: remoteArticleBody.attachments,
        });
    } catch (e) {
        Log.insertNewLog({method: 'getArticleAttachments', controller: ARTICLE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

