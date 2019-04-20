import handleRemoteRequest from '../../utils/api';
import { getFavouriteTree, seFavouriteTree } from '../../database/treeDatabase';

export const fetchRemoteFavourite = group => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'GET',
    url: `/star?group=${ group }`,
    actions: {
        onRequest: [ ],
        onSuccess: [ resolve ],
        onError: [ reject ],
    },
}));

export const fetchFavourite = group => new Promise(async (resolve, reject) => {
    try {
        const remoteFavouriteTree = await fetchRemoteFavourite(group);
        await seFavouriteTree(remoteFavouriteTree, group);
        resolve(remoteFavouriteTree);
    } catch (e) {
        const localFavouriteTree = await getFavouriteTree(group);
        if (localFavouriteTree) {
            resolve(localFavouriteTree);
        } else {
            reject(e);
        }
    }
});
