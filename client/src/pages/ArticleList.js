import React, { lazy } from 'react';
import { Container } from 'bachelor-ui';
import SuspenseLoader from '../components/SuspenseLoader';

const ArticleList = lazy(() => import('../containers/ArticleList'));
const MobileArticleListHeader = lazy(() => import('../containers/ArticleList/MobileArticleListHeader'));

const ArticleListView = () => (
    <Container alignItems="flex-start" height="100vh" flexDirection="column" justifyContent="center">
        <SuspenseLoader>
            <MobileArticleListHeader />
            <ArticleList isMobile />
        </SuspenseLoader>
    </Container>
);

export default ArticleListView;
