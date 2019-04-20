import { useContext, useEffect } from 'react';
import { GroupContext, UiContext } from '../../../context';
import { setIsStarred } from '../../../actions/groupActions';
import { setErrorNotification } from '../../../actions/uiActions';
import getRestArticle from '../../../api/article/getArticle';

const useGetRestArticle = () => {
    const { group: { focusedMessage, selected }, dispatch: GroupDispatch } = useContext(GroupContext);
    const { dispatch } = useContext(UiContext);
    useEffect(() => {
        if (focusedMessage) {
            getRestArticle(selected, focusedMessage)
                .then(({ starred }) => GroupDispatch(setIsStarred(starred)))
                .catch(e => dispatch(setErrorNotification(e)));
        }
    }, [focusedMessage]);
};

export default useGetRestArticle;
