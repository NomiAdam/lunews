import { useContext, useEffect, useState } from 'react';
import { length, o } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import { GroupContext, UiContext } from '../../../context';
import { setErrorNotification } from '../../../actions/uiActions';
import getArticleAttachments from '../../../api/article/getArticleAttachments';

const getSizeOfArray = o(length, defaultToEmptyArray);

const useFetchAttachments = (globalID) => {
    const { group: { focusedMessage } } = useContext(GroupContext);
    const [attachments, setAttachments] = useState(null);
    const { dispatch } = useContext(UiContext);
    useEffect(() => {
        setAttachments(null);
        if (focusedMessage === globalID) {
            getArticleAttachments(focusedMessage)
                // eslint-disable-next-line no-shadow
                .then(({ attachments }) => setAttachments(attachments))
                .catch(e => dispatch(setErrorNotification(e)));
        }
    }, [focusedMessage]);
    const attachmentsSize = getSizeOfArray(attachments);
    return { attachmentsSize, attachments };
};

export default useFetchAttachments;
