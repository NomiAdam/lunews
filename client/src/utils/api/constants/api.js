/* eslint-disable import/no-mutable-exports */

let URL_PREFIX = '/api/v3';
let URL_ONLY = '';
if (process.env.NODE_ENV === 'development') {
    URL_PREFIX = 'http://localhost:3333/api/v3';
    URL_ONLY = 'http://localhost:3333';
}

export { URL_PREFIX, URL_ONLY };

export const API_METHODS = {
    post: 'post',
    get: 'get',
    put: 'put',
    delete: 'delete',
};

export const CREDENTIALS = {
    omit: false,
    include: true,
};

export const REDIRECT = {
    follow: 5,
    none: 0,
};

export const RESPONSE_TYPE = {
    json: 'json',
    text: 'text',
    document: 'document',
    blob: 'blob',
};
