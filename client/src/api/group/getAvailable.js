import handleRemoteRequest from '../../utils/api';

export default () => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'GET',
        url: '/group/list',
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    },
));
