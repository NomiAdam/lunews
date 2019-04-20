import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Grid, GridCol, Icon, flexConstants,
} from 'bachelor-ui';
import { withRouter } from 'react-router';
import { o } from 'ramda';
import Header from '../../components/Header';
import BackArrow from '../../components/BackArrow';
import { GroupContext } from '../../context';
import { setActiveMessage } from '../../actions/groupActions';

const MobileArticleListHeader = ({ history: { push } }) => {
    const { group: { selected }, dispatch } = useContext(GroupContext);
    return (
        <Header
            headingChildren={ (
                <Grid>
                    <GridCol
                        colXS={ 10 }
                        horizontalAlign={ flexConstants.POSITION_LEFT }
                        verticalAlign={ flexConstants.POSITION_CENTER }
                    >
                        <BackArrow handleBack={ (/* EVENT */) => push('/') } label={ selected || 'Select a group.' } />
                    </GridCol>
                    <GridCol
                        colXS={ 2 }
                        horizontalAlign={ flexConstants.POSITION_RIGHT }
                        verticalAlign={ flexConstants.POSITION_CENTER }
                    >
                        <Icon
                            name="add"
                            clickable
                            secondary
                            onClick={ (/* EVENT */) => {
                                dispatch(setActiveMessage(undefined));
                                push('/post');
                            } }
                        />
                    </GridCol>
                </Grid>
            ) }
        />
    );
};

MobileArticleListHeader.propTypes = {
    history: PropTypes.object,
};

export default o(withRouter, memo)(MobileArticleListHeader);
