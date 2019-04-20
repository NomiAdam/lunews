import * as FavouriteGet from './favourite-get.action';
import * as FavouritePost from './favourite-post.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: FavouriteGet.getFavouriteArticles,
            level: 'public',
            middlewares: [authenticated],
        },
        post: {
            action: FavouritePost.setFavourite,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/remove': {
        post: {
            action: FavouritePost.removeFavourite,
            level: 'public',
            middlewares: [authenticated],
        },
    }
};
