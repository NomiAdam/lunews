import {Context} from 'koa';
import Favourite from '../../model/Favourite';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';

const FAVOURITE_CONTROLLER = 'favourite-get';

export const getFavouriteArticles = async (ctx: Context) => {
    try {
        // const { id } = ctx.state.user;
        const groups = await Favourite.listFavourite(1);
        return ctx.body = successResponse(groups);
    } catch (e) {
        Log.insertNewLog({ method: 'getFavouriteArticles', controller: FAVOURITE_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
