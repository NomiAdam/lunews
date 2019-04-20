import React, { memo } from 'react';
import { Container, flexConstants } from 'bachelor-ui';
import SearchHeading from './SearchHeading';
import AsyncArticleTree from './AsyncArticleTree';
import SuspenseLoader from '../../components/SuspenseLoader';

const ArticleList = ({ isMobile }) => (
    <Container
        height="100vh"
        justifyContent={ flexConstants.POSITION_CENTER }
        alignItems={ flexConstants.POSITION_CENTER }
        flexDirection={ flexConstants.DIRECTION_COLUMN }
    >
        <SearchHeading isMobile={ isMobile } />
        <Container
            height="95vh"
            justifyContent={ flexConstants.POSITION_LEFT }
            alignItems={ flexConstants.POSITION_LEFT }
        >
            <SuspenseLoader>
                <AsyncArticleTree isMobile={ isMobile } />
            </SuspenseLoader>
        </Container>
    </Container>
);

export default memo(ArticleList);
