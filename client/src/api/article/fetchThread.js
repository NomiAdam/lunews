import { append, map } from 'ramda';
import { isNotNilObject } from 'ramda-extension';
import handleRemoteRequest from '../../utils/api';
import { getTree, setTree } from '../../database/treeDatabase';
import { getMessage, setMessage } from '../../database/articlesDatabase';

export default ( reference, group ) => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'GET',
    url: `/article/tree?reference=${ reference }&group=${ group }`,
    actions: {
        onRequest: [],
        onSuccess: [
            async (tree) => {
                setMessage(reference, tree);
                resolve(tree);
            },
            async () => {
                const oldTree = await getTree(group);
                const validTreeAgain = {
                    ...oldTree,
                    read: append(reference, oldTree.read),
                    tree: map(({ messageInfo, ...rest }) => {
                        if (messageInfo.globalID === reference) {
                            return { messageInfo, ...rest, newChildrenSize: 0 };
                        } return { messageInfo, ...rest };
                    })(oldTree.tree),
                };
                await setTree(validTreeAgain, group);
            }],
        onError: [async (e) => {
            try {
                const tree = await getMessage(reference);
                if (isNotNilObject(tree)) {
                    resolve(tree);
                } else {
                    reject(e);
                }
            } catch (innerError) {
                reject(innerError);
            }
        }],
    },
}));
