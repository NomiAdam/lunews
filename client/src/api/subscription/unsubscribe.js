import handleRemoteRequest from '../../utils/api/index';
import { setSubscribedGroups } from './getSubscribed';

export default group => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'POST',
        url: '/favourite/remove',
        data: { group },
        actions: {
            onRequest: [],
            onSuccess: [resolve, setSubscribedGroups],
            onError: [reject],
        },
    },
));
