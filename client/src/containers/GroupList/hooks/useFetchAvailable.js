import { useContext, useEffect, useState } from 'react';
import { juxt } from 'ramda';
import { UiContext } from '../../../context';
import listAvailable from '../../../api/group/getAvailable';
import { setErrorNotification } from '../../../actions/uiActions';
import setSubscription from '../../../api/subscription/setSubscription';

const useFetchAvailable = (handleClick) => {
    const [groups, setGroups] = useState(null);
    const { dispatch } = useContext(UiContext);
    useEffect(() => {
        listAvailable().then(setGroups).catch(e => dispatch(setErrorNotification(e)));
    }, []);
    const handleApiClick = groupName => setSubscription(groupName)
        .then(juxt([setGroups, handleClick]))
        .catch(e => dispatch(setErrorNotification(e)));
    return [groups, handleApiClick];
};

export default useFetchAvailable;
