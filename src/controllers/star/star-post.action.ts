import {Context} from 'koa';
import {getConnectionInstance} from '../../services/nntp';
import News from '../../model/Articles';
import Star from '../../model/Star';
import {errorResponse, successResponse} from '../../util/responseCreator';
import {fetchStarredArticles} from './star.util';
import Log from '../../model/Log';

const STAR_CONTROLLER = 'star-post';

export const starArticle = async (ctx: Context) => {
    const { globalID, group } = <{ globalID: string, group: string }>ctx.request.body;
    try {
        // const { id } = ctx.state.user;
        await Star.addStar(1, globalID, group);
        const connection = getConnectionInstance();
        await connection.connect();
        const remoteArticleHead = await connection.getArticleHead(globalID);
        await News.insertNewArticle(group, remoteArticleHead);
        await connection.quit();
        const starredMessage = await fetchStarredArticles(globalID);
        return ctx.body = successResponse(starredMessage);
    } catch (e) {
        Log.insertNewLog({ method: 'starArticle', controller: STAR_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const removeArticleStar = async (ctx: Context) => {
    const { globalID } = <{ globalID: string }>ctx.request.body;
    try {
        // const { id } = ctx.state.user;
        await Star.removeStar(1, globalID);
        const starredMessage = await fetchStarredArticles(globalID);
        return ctx.body = successResponse(starredMessage);
    } catch (e) {
        Log.insertNewLog({ method: 'removeArticleStar', controller: STAR_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
