import handleRemoteRequest from '../../utils/api';
import { revalidateTreeUsingLocal } from '../article/fetchArticles';
import { getTree } from '../../database/treeDatabase';

const validateTreeData = (resolve, size, group) => async (tree) => {
    let localTree = await getTree(group);
    if (!localTree) {
        localTree = tree;
    }
    const { mappedTree } = revalidateTreeUsingLocal(tree, localTree);
    const slicedTree = {
        ...mappedTree,
        tree: mappedTree.tree.slice(0, size),
    };
    resolve(slicedTree);
};

export default (pattern, group, size) => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'GET',
    url: `/tree/regex?pattern=${ pattern }&group=${ group }`,
    actions: {
        onRequest: [],
        onSuccess: [validateTreeData(resolve, size, group)],
        onError: [reject],
    },
}));
