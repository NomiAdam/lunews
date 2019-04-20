import handleRemoteRequest from '../../utils/api';

export default reference => new Promise((resolve, reject) => {
    handleRemoteRequest({
        method: 'GET',
        url: `/article/body?reference=${ reference }`,
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    });
});
