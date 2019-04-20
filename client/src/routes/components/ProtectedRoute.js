import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { isNilOrEmptyString } from 'ramda-extension';
import { UserContext } from '../../context/userContext';
import Login from '../../pages/Login';

const ProtectedRoute = ({ component: Component, ...other }) => {
    const { user: { profile } } = useContext(UserContext);
    return (
        <Route
            { ...other }
            render={
                props => (isNilOrEmptyString(profile) ? (
                    <Login />
                ) : (
                    <Component { ...props } />
                ))
            }
        />
    );
};

export default ProtectedRoute;
