import React from 'react';
import PropTypes from 'prop-types';
import {
    Icon, Container, Heading, flexConstants, lightTheme, SlideInLeft,
} from 'bachelor-ui';

const BackArrow = ({ handleBack, label }) => (
    <SlideInLeft>
        <Container
            flexDirection={ flexConstants.DIRECTION_ROW }
            backgroundColor={ lightTheme.transparent }
        >
            <Icon
                name="arrowBack"
                clickable
                onClick={ handleBack }
                fontSize="3em"
            />
            <Heading label={ label } />
        </Container>
    </SlideInLeft>
);

BackArrow.propTypes = {
    handleBack: PropTypes.func,
    label: PropTypes.func,
};

export default BackArrow;
