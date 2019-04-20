import React from 'react';
import {
    Container, flexConstants, Button, Media,
} from 'bachelor-ui';
import { isMobile } from 'react-device-detect';

const Error = () => {
    const redirectToLogin = (/* EVENT */) => {
        window.location.href = '/auth/google';
    };
    return (
        <Container
            width="100%"
            height="100vh"
            flexDirection={ flexConstants.DIRECTION_COLUMN }
            alignItems={ flexConstants.POSITION_CENTER }
            justifyContent={ flexConstants.POSITION_CENTER }
        >
            <Media width={ isMobile ? '100%' : '50%' } image="/logo.png" label="Lunews" />
            <Button onClick={ redirectToLogin } label="Enter" color="#a82824" border="1px solid #a82824" />
        </Container>
    );
};

export default Error;
