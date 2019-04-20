import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { ThemeProvider } from 'bachelor-ui';
import renderRoutes from '../routes/renderRoutes';
import Notification, { ConnectionNotification } from '../components/Notification/index';
import { useLocalCache, useTheme } from './hooks';
import DEFAULT_STYLE from './constants/style';
import SuspenseLoader from '../components/SuspenseLoader';

const App = ({ routes }) => {
    const [theme] = useTheme();
    useLocalCache();
    return (
        <div style={ DEFAULT_STYLE }>
            <Notification />
            <ConnectionNotification />
            <ThemeProvider theme={ theme }>
                <SuspenseLoader>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </SuspenseLoader>
            </ThemeProvider>
        </div>
    );
};

App.propTypes = {
    /**
     * Array of all possible routes defines in <rootDIR>/routes/routes.js
     */
    routes: PropTypes.array,
};

App.defaultProps = {
    routes: [],
};

export default App;
