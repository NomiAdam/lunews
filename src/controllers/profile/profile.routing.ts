import * as ProfileGet from './profile-get.action';
import * as ProfilePost from './profile-post.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: ProfileGet.getProfile,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/signature': {
        post: {
            action: ProfilePost.updateProfileSignature,
            level: 'public',
            middlewares: [authenticated],
        },
    },
};
