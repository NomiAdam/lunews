import { map, difference } from 'ramda';
import handleRemoteRequest from '../../utils/api';
import { getTree, setTree } from '../../database/treeDatabase';
import { getChildrenSize, getChildrenKeys } from '../../utils/getChildrenCount';

export const fetchRemoteArticles = (group, downloadSize) => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'GET',
    url: `/tree/subset?group=${ group }&quantity=${ downloadSize }`,
    actions: {
        onRequest: [],
        onSuccess: [resolve],
        onError: [reject],
    },
}));

export const revalidateTreeUsingLocal = (remoteTree) => {
    const validTree = {
        ...remoteTree,
        tree: Object.values(remoteTree.tree).sort(
            (a, b) => new Date(b.messageInfo.date) - new Date(a.messageInfo.date),
        ),
    };
    const readArray = validTree.read;
    const validTreeAgain = {
        ...validTree,
        tree: map(({ messageInfo, ...rest }) => ({
            messageInfo, unread: difference(getChildrenKeys(rest), readArray), childrenSize: getChildrenSize(rest),
        }))(validTree.tree),
    };
    return { onlySortedTree: validTree, mappedTree: validTreeAgain };
};

export const reDownloadArticles = (group, downloadSize = 1000) => new Promise(async (resolve, reject) => {
    try {
        const remoteTree = await fetchRemoteArticles(group, downloadSize);
        const localTree = await getTree(group);
        const { onlySortedTree, mappedTree } = revalidateTreeUsingLocal(remoteTree, localTree);
        await setTree(mappedTree, group);
        resolve(onlySortedTree);
    } catch (e) {
        reject(e);
    }
});

export default (group, size = 0, downloadSize) => new Promise(async (resolve, reject) => {
    try {
        let localTree = await getTree(group);
        if (!localTree) {
            const remoteTree = await reDownloadArticles(group, downloadSize);
            const { mappedTree } = revalidateTreeUsingLocal(remoteTree, remoteTree);
            localTree = mappedTree;
        } else {
            reDownloadArticles(group, downloadSize);
        }
        const slicedTree = {
            ...localTree,
            tree: localTree.tree.slice(0, size),
        };
        resolve(slicedTree);
    } catch (e) {
        reject(e);
    }
});
