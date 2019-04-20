import { curry, forEachObjIndexed, pathOr } from 'ramda';
import axios from 'axios';
import {
    API_METHODS, REDIRECT, URL_PREFIX, RESPONSE_TYPE, URL_ONLY,
} from './constants/api';

const getResponseStatusOrDefault = pathOr(500, ['response', 'status']);
const apiFacade = curry(
    (method, headers, maxRedirects, responseType, formData, body, url) => new Promise(
        (resolve, reject) => {
            const option = {
                method,
                url: `${ URL_PREFIX }${ url }`,
                headers,
                responseType,
                maxRedirects,
            };
            if (method !== API_METHODS.get) {
                if (formData) {
                    const bodyFormData = new FormData();
                    const prepareBodyFormData = (value, key) => bodyFormData.append(key, value);
                    forEachObjIndexed(prepareBodyFormData, body);
                    option.data = bodyFormData;
                } else {
                    option.data = body;
                }
            }
            axios(option).then(({ data }) => resolve(data)).catch((e) => {
                if (getResponseStatusOrDefault(e) === 401) {
                    window.location.href = `${ URL_ONLY }/auth/google`;
                } else {
                    reject(e);
                }
            });
        },
    ),
);

/**
 * Expects only URL
 * (url) => response
 */
export const axiosGetRequest = apiFacade(
    API_METHODS.get,
    {},
    REDIRECT.none,
    RESPONSE_TYPE.json,
    null,
    false,
);

/**
 * Expects only URL
 * (url) => response
 */
export const axiosDeleteRequest = apiFacade(
    API_METHODS.delete,
    {},
    REDIRECT.none,
    RESPONSE_TYPE.json,
    null,
    false,
);

/**
 * Expects URL and Javascript Object
 * (data, url) => response
 */
export const axiosPostRequest = apiFacade(
    API_METHODS.post,
    {
        'Content-Type': 'application/json',
    },
    REDIRECT.none,
    RESPONSE_TYPE.json,
    false,
);

/**
 * Expects URL and Javascript Object
 * (data, url) => response
 */
export const axiosMultiFormData = apiFacade(
    API_METHODS.post,
    {
        'Content-Type': 'multipart/form-data',
    },
    REDIRECT.none,
    RESPONSE_TYPE.json,
    false,
);

/**
 * Expects URL and Javascript Object
 * (data, url) => response
 */
export const axiosPutRequest = apiFacade(
    API_METHODS.put,
    {
        'Content-Type': 'application/json',
    },
    REDIRECT.none,
    RESPONSE_TYPE.json,
    false,
);

/**
 * Expects URL and Javascript Object
 * (data, url) => response
 */
export const axiosFormPostRequest = apiFacade(
    API_METHODS.post,
    {},
    REDIRECT.none,
    RESPONSE_TYPE.json,
    true,
);
