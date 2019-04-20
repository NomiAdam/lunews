import handleRemoteRequest from '../../utils/api/index';

export default group => new Promise((resolve, reject) => handleRemoteRequest({
    method: 'GET',
    url: `/group?group=${ group }`,
    actions: {
        onRequest: [],
        onSuccess: [resolve],
        onError: [reject],
    },
}));
