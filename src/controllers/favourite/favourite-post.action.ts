import {Context} from 'koa';
import Favourite from '../../model/Favourite';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const FAVOURITE_CONTROLLER = 'favourite-post';

export const setFavourite = async (ctx: Context) => {
    try {
        // const {id} = ctx.state.user;
        const { group } = <{ group: string }>ctx.request.body;
        await Favourite.assignFavourite(1, group);
        const groups = await Favourite.listFavourite(1);
        return ctx.body = successResponse(groups);
    } catch (e) {
        Log.insertNewLog({ method: 'getFavouriteArticles', controller: FAVOURITE_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};

export const removeFavourite = async (ctx: Context) => {
    try {
        // const {id} = ctx.state.user;
        const { group } = <{ group: string }>ctx.request.body;
        await Favourite.removeFavourite(1, group);
        const groups = await Favourite.listFavourite(1);
        return ctx.body = successResponse(groups);
    } catch (e) {
        Log.insertNewLog({ method: 'removeFavourite', controller: FAVOURITE_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
