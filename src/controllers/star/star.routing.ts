import * as StarGet from './star-get.action';
import * as StarPost from './star-post.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: StarGet.getStarredArticles,
            level: 'public',
            middlewares: [authenticated],
        },
        post: {
            action: StarPost.starArticle,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/remove': {
        post: {
            action: StarPost.removeArticleStar,
            level: 'public',
            middlewares: [authenticated],
        },
    }
};
