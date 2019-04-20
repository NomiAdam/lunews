import { useContext, useEffect, useState } from 'react';
import { GroupContext, UiContext } from '../../../context';
import { setFocusedMessage } from '../../../actions/groupActions';
import fetchArticleTree from '../../../api/article/fetchThread';
import { setErrorNotification } from '../../../actions/uiActions';

const useFetchArticleTree = () => {
    const { group: { messageID, selected }, dispatch: GroupDispatch } = useContext(GroupContext);
    const { dispatch } = useContext(UiContext);
    const [isLoading, setIsLoading] = useState(false);
    const [articleTree, setTree] = useState(null);
    useEffect(() => {
        if (messageID) {
            GroupDispatch(setFocusedMessage(messageID));
            setTree(null);
            setIsLoading(true);
            fetchArticleTree(messageID, selected)
                .then((tree) => {
                    setTree(tree);
                    setIsLoading(false);
                })
                .catch((e) => {
                    dispatch(setErrorNotification(e));
                    setIsLoading(false);
                });
        }
    }, [messageID]);
    return [articleTree, isLoading];
};

export default useFetchArticleTree;
