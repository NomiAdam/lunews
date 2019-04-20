import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import BackArrow from '../../components/BackArrow';

const MobileArticleHeader = ({ history: { push } }) => {
    const redirectBack = useRef(() => push('/list'));
    return (
        <Header
            before
            actionChildren={ (
                <BackArrow
                    handleBack={ redirectBack.current }
                    label="Article"
                />
            ) }
        />
    );
};

MobileArticleHeader.propTypes = {
    history: PropTypes.any,
};

export default withRouter(MobileArticleHeader);
