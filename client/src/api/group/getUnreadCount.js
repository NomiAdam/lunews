/* eslint-disable import/prefer-default-export */
import handleRemoteRequest from '../../utils/api';

export default () => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'GET',
        url: '/group/unread',
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    },
));
