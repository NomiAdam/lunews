import handleRemoteRequest from '../../utils/api/index';
import { setRemoteArticle } from './setStarredArticle';

export default messageId => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'POST',
    url: '/star/remove',
    data: { globalID: messageId },
    actions: {
        onRequest: [],
        onSuccess: [resolve, setRemoteArticle(messageId)],
        onError: [reject],
    },
}));
