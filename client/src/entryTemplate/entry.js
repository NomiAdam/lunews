/* eslint-disable import/no-extraneous-dependencies,global-require */
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import * as serviceWorker from '../serviceWorker';

export default () => {
    if (process.env.NODE_ENV === 'development') {
        const { whyDidYouUpdate } = require('why-did-you-update');
        whyDidYouUpdate(React);
    }

    const rootElement = document.getElementById('root');

    render(
        <Root />,
        rootElement,
    );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below.
serviceWorker.register();
