import { getArticleInformation, getArticleTree, getArticleAttachments, getArticleBody } from './article-get.action';
import { postArticle } from './article-post.action';
import { authenticated } from '../../middlewares';

export default {
    '/': {
        get: {
            action: getArticleInformation,
            level: 'public',
            middlewares: [authenticated],
        },
        post: {
            action: postArticle,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/tree': {
        get: {
            action: getArticleTree,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/body': {
        get: {
            action: getArticleBody,
            level: 'public',
            middlewares: [authenticated],
        },
    },
    '/attachments': {
        get: {
            action: getArticleAttachments,
            level: 'public',
            middlewares: [authenticated],
        },
    },
};
