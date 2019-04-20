import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Container, flexConstants } from 'bachelor-ui';
import Loader from 'react-loader-spinner';

const SuspenseLoader = ({ children }) => (
    <Suspense fallback={ (
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
    ) }
    >
        { children }
    </Suspense>
);

SuspenseLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default SuspenseLoader;
