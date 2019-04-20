import React, { lazy } from 'react';
import { Container } from 'bachelor-ui';
import SuspenseLoader from '../components/SuspenseLoader';

const MobileArticleHeader = lazy(() => import('../containers/Article/MobileArticleHeader'));
const Article = lazy(() => import('../containers/Article'));

const ArticleView = () => (
    <Container alignItems="center" height="100vh" flexDirection="column" justifyContent="flex-start">
        <SuspenseLoader>
            <MobileArticleHeader />
            <Article isMobile />
        </SuspenseLoader>
    </Container>
);

export default ArticleView;
