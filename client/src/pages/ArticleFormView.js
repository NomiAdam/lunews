import React, { lazy } from 'react';
import { Container } from 'bachelor-ui';
import SuspenseLoader from '../components/SuspenseLoader';

const ArticleForm = lazy(() => import('../containers/ArticleForm'));
const MobileArticleFormHeader = lazy(() => import('../containers/ArticleForm/MobileArticleFormHeader'));

const ArticleFormView = () => (
    <Container alignItems="flex-start" height="100vh" flexDirection="column" justifyContent="center">
        <SuspenseLoader>
            <MobileArticleFormHeader />
            <ArticleForm isMobile />
        </SuspenseLoader>
    </Container>
);

export default ArticleFormView;
