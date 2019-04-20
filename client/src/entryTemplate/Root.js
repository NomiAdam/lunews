import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import App from '../App';
import UserProvider from '../context/userContext';
import UiProvider from '../context/uiContext';
import GroupProvider from '../context/groupContext';
import FilterProvider from '../context/filterContext';
import { desktopRoutes, mobileRoutes } from '../routes/routes';

const Root = () => (
    <BrowserRouter>
        <FilterProvider>
            <UserProvider>
                <UiProvider>
                    <GroupProvider>
                        <App routes={ isMobile ? mobileRoutes : desktopRoutes } />
                    </GroupProvider>
                </UiProvider>
            </UserProvider>
        </FilterProvider>
    </BrowserRouter>
);

export default Root;
