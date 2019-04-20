import { useContext, useEffect, useState } from 'react';
import { GroupContext, UiContext } from '../../../context';
import { setErrorNotification } from '../../../actions/uiActions';
import getArticleBody from '../../../api/article/getArticleBody';

const useFetchBody = (globalID) => {
    const { group: { focusedMessage } } = useContext(GroupContext);
    const [body, setBody] = useState(null);
    const { dispatch } = useContext(UiContext);
    useEffect(() => {
        setBody(null);
        if (focusedMessage === globalID) {
            getArticleBody(focusedMessage)
            // eslint-disable-next-line no-shadow
                .then(({ body }) => setBody(body))
                .catch(e => dispatch(setErrorNotification(e)));
        }
    }, [focusedMessage]);
    return [body];
};

export default useFetchBody;
