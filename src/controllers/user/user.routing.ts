import * as UserPost from './user-post.action';
import * as UserGet from './user-get.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: UserGet.logoutUser,
            level: 'public',
            middlewares: [authenticated],
        },
        post: {
            action: UserPost.loginUser,
            level: 'public',
            middlewares: [],
        },
    },
    '/register': {
        post: {
            action: UserPost.registerUser,
            level: 'public',
            middlewares: [],
        },
    },
};
