import * as TreeGet from './tree-get.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: TreeGet.getTree,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/subset': {
        get: {
            action: TreeGet.getTreeSub,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/regex': {
        get: {
            action: TreeGet.getRegexTree,
            level: 'public',
            middlewares: [authenticated],
        },
    },
};
