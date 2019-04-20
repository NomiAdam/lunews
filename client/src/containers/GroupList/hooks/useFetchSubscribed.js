import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../../context';
import listSubscribed from '../../../api/subscription/getSubscribed';
import { setErrorNotification } from '../../../actions/uiActions';
import groupUnsubscribe from '../../../api/subscription/unsubscribe';

const useFetchSubscribed = () => {
    const { dispatch } = useContext(UiContext);
    const [groups, setGroups] = useState(null);
    useEffect(() => {
        listSubscribed()
            .then(setGroups)
            .catch(e => dispatch(setErrorNotification(e)));
    }, []);
    const handleGroupUnsubscribe = groupName => groupUnsubscribe(groupName)
        .then(setGroups)
        .catch(e => dispatch(setErrorNotification(e)));
    return [groups, handleGroupUnsubscribe];
};

export default useFetchSubscribed;
