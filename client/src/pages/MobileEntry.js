import React, { lazy } from 'react';
import { Container } from 'bachelor-ui';
import SuspenseLoader from '../components/SuspenseLoader';

const Navigation = lazy(() => import('../containers/Navigation'));

const MobileEntry = () => (
    <Container alignItems="center" height="100vh" flexDirection="column" justifyContent="center">
        <SuspenseLoader>
            <Navigation isMobile />
        </SuspenseLoader>
    </Container>
);

export default MobileEntry;
