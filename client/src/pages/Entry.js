import React, { lazy } from 'react';
import { GridCol, Grid, FadeIn } from 'bachelor-ui';
import ArticleList from '../containers/ArticleList';
import { ArticleFormDialog } from '../containers/ArticleForm';
import Navigation from '../containers/Navigation';
import useDesktopResolver from '../hooks/useDesktopResolver';
import SuspenseLoader from '../components/SuspenseLoader';

const Article = lazy(() => import('../containers/Article'));

const Entry = () => {
    const isNotFocused = useDesktopResolver();
    return (
        <Grid>
            <GridCol colXS={ 12 }>
                <ArticleFormDialog />
            </GridCol>
            <GridCol colXS={ 2 }>
                <Navigation />
            </GridCol>
            <GridCol
                colXS={ isNotFocused ? 10 : 5 }
                style={ isNotFocused ? {} : { borderRight: '1px solid rgb(0, 153, 255)' } }
            >
                <ArticleList />
            </GridCol>
            { !isNotFocused && (
                <GridCol colXS={ 5 }>
                    <SuspenseLoader>
                        <FadeIn>
                            <Article />
                        </FadeIn>
                    </SuspenseLoader>
                </GridCol>
            ) }
        </Grid>
    );
};

export default Entry;
