import * as GroupGet from './group-get.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: GroupGet.getGroup,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/list': {
        get: {
            action: GroupGet.listGroups,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/unread': {
        get: {
            action: GroupGet.getGroupUnread,
            level: 'public',
            middlewares: [authenticated],
        },
    },
};
