import handleRemoteRequest from '../../utils/api/index';

export default () => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'GET',
        url: '/user',
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    },
));
