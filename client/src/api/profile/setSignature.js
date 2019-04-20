import handleRemoteRequest from '../../utils/api';

export default signature => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'POST',
        url: '/profile/signature',
        data: { signature },
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    },
));
