import { cond } from 'ramda';
import {
    axiosGetRequest, axiosPostRequest, axiosPutRequest, axiosMultiFormData,
} from './axiosFacade';
import {
    EQUALS_GET, EQUALS_POST, EQUALS_PUT, EQUALS_MULTI_PART,
} from './constants/request';
import handleActions from './utils/handleActions';

export const handleGetRequest = ({ url, actions }) => async (handler) => {
    const { onRequest, onSuccess, onError } = actions;
    const handleRequest = handleActions(onRequest);
    const handleSuccess = handleActions(onSuccess);
    const handleError = handleActions(onError);
    handleRequest();
    try {
        const { response } = await handler(url);
        handleSuccess(response);
    } catch (e) {
        handleError(e);
    }
};

export const handlePostRequest = ({ url, data, actions }) => async (handler) => {
    const { onRequest, onSuccess, onError } = actions;
    const handleRequest = handleActions(onRequest);
    const handleSuccess = handleActions(onSuccess);
    const handleError = handleActions(onError);
    handleRequest();
    try {
        const { response } = await handler(data, url);
        handleSuccess(response);
    } catch (e) {
        handleError(e);
    }
};

export default ({ method, ...rest }) => cond([
    [EQUALS_GET, () => handleGetRequest(rest)(axiosGetRequest)],
    [EQUALS_POST, () => handlePostRequest(rest)(axiosPostRequest)],
    [EQUALS_PUT, () => handleGetRequest(rest)(axiosPutRequest)],
    [EQUALS_MULTI_PART, () => handlePostRequest(rest)(axiosMultiFormData)],
])(method);
