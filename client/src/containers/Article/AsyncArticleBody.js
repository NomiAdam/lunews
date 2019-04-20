import React from 'react';
import PropTypes from 'prop-types';
import { prop, ifElse } from 'ramda';
import { alwaysNull } from 'ramda-extension';
import { Grid, GridCol } from 'bachelor-ui';
import SuspenseLoader from '../../components/SuspenseLoader';

const bodyStyle = {
    padding: '20px 0',
};

const AsyncArticleBody = ifElse(
    prop('body'),
    ({ body }) => (
        <Grid>
            <GridCol colXS={ 12 }>
                <div style={ bodyStyle } dangerouslySetInnerHTML={ { __html: body } } />
            </GridCol>
        </Grid>
    ),
    alwaysNull,
);

AsyncArticleBody.propTypes = {
    body: PropTypes.string,
};

const AsyncTreeBody = ({ body }) => (
    <SuspenseLoader>
        <AsyncArticleBody body={ body } />
    </SuspenseLoader>
);

AsyncTreeBody.propTypes = {
    body: PropTypes.string,
};

export default AsyncTreeBody;
