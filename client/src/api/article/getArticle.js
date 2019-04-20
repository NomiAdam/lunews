import handleRemoteRequest from '../../utils/api';
import { getMessage, setMessage } from '../../database/articlesDatabase';

export const fetchRemoteArticle = ( group, reference ) => new Promise((resolve, reject) => {
    handleRemoteRequest({
        method: 'GET',
        url: `/article?reference=${ reference }&group=${ group }`,
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    });
});

export default ( group, reference ) => new Promise(async (resolve, reject) => {
    try {
        const remoteArticle = await fetchRemoteArticle(group, reference);
        await setMessage(reference, remoteArticle);
        resolve(remoteArticle);
    } catch (e) {
        const localMessage = await getMessage(reference).catch(reject);
        if (localMessage) {
            resolve(localMessage);
        } else {
            reject(e);
        }
    }
});
