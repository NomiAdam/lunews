import React from 'react';
import { Container, flexConstants } from 'bachelor-ui';
import Loader from 'react-loader-spinner';

const FakeLoader = () => (
    <Container
        width="100%"
        height="100%"
        flexDirection={ flexConstants.DIRECTION_COLUMN }
        alignItems={ flexConstants.POSITION_CENTER }
        justifyContent={ flexConstants.POSITION_CENTER }
    >
        <Loader
            type="RevolvingDot"
            color="#a82824"
        />
    </Container>
);

export default FakeLoader;
