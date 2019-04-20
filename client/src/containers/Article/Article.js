import React from 'react';
import { Container, flexConstants } from 'bachelor-ui';
import AsyncArticleTree from './AsyncArticleTree';
import SuspenseLoader from '../../components/SuspenseLoader';

const Article = ({ isMobile }) => (
    <Container
        height={ isMobile ? '90vh' : '100vh' }
        flexDirection={ flexConstants.DIRECTION_COLUMN }
        alignItems={ flexConstants.POSITION_RIGHT }
        justifyContent={ flexConstants.POSITION_LEFT }
    >
        <SuspenseLoader>
            <AsyncArticleTree isMobile={ isMobile } />
        </SuspenseLoader>
    </Container>
);

export default Article;
