import React from 'react';
import { Route } from 'react-router';
import { map } from 'ramda';
import ProtectedRoute from './components/index';

const renderRoute = ({
    Component, exact, path, secure,
}) => (
    secure ? (
        <ProtectedRoute key={ path } exact={ exact } path={ path } component={ Component } />
    ) : (
        <Route key={ path } exact={ exact } path={ path } component={ Component } />
    )
);

export default map(renderRoute);
