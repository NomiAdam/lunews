/* eslint-disable no-plusplus */
import handleRemoteRequest from '../../utils/api';

export default (group, data) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('reference', data.messageID);
    formData.append('html', data.body);
    formData.append('raw', data.body);
    formData.append('subject', data.subject);
    formData.append('group', group);
    const attachments = Object.values(data.attachments);
    attachments.forEach((attachment, index) => formData.append(`attachment-${ index }`, attachment));
    handleRemoteRequest({
        method: 'MULTI',
        url: '/article',
        data: formData,
        actions: {
            onRequest: [],
            onSuccess: [resolve],
            onError: [reject],
        },
    });
});
