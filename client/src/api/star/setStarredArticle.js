import handleRemoteRequest from '../../utils/api/index';
import { setMessage } from '../../database/articlesDatabase';

export const setRemoteArticle = globalD => async remoteArticle => setMessage(globalD, remoteArticle);

export default (messageId, groupName) => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'POST',
    url: '/star',
    data: { globalID: messageId, group: groupName },
    actions: {
        onRequest: [],
        onSuccess: [resolve, setRemoteArticle(messageId)],
        onError: [reject],
    },
}));
