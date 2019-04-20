import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import BackArrow from '../../components/BackArrow';
import { GroupContext } from '../../context';
import { useIsHeaderEmpty } from './hooks';

const MobileArticleFormHeader = ({ history: { goBack, push } }) => {
    const { group: { messageID, selected } } = useContext(GroupContext);
    const [ isEmpty ] = useIsHeaderEmpty();
    useEffect(() => {
        if (isEmpty) {
            push('/');
        }
    }, [isEmpty]);
    return (
        <Header
            actionChildren={
                (
                    <BackArrow handleBack={ goBack } label={ messageID || selected } />
                )
            }
        />
    );
};

MobileArticleFormHeader.propTypes = {
    history: PropTypes.object,
};

export default withRouter(MobileArticleFormHeader);
