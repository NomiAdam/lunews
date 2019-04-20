import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import {
    Container, Icon, lightTheme, ListItem, Paragraph, SlideInRight,
} from 'bachelor-ui';
import flexConstants from 'bachelor-ui/dist/constants/flex';
import { Link } from 'react-router-dom';

const linkStyle = {
    outline: 'none',
    textDecoration: 'none',
    width: '100%',
};

const SubscribedItem = ({
    handleClick, edit, handleGroupUnsubscribe, isMobile, name,
}) => (
    <ListItem
        key={ name }
        pointer={ !edit }
        onClick={ (/* EVENT */) => (edit ? null : handleClick(name)) }
        disableHover={ edit }
    >
        <SlideInRight>
            <Container
                padding="0 20px"
                justifyContent={ flexConstants.POSITION_SPACER }
                alignItems={ flexConstants.POSITION_CENTER }
                flexDirection={ flexConstants.DIRECTION_ROW }
                backgroundColor={ lightTheme.transparent }
            >
                { isMobile && !edit ? (
                    <Link to="/list" style={ linkStyle }>
                        <Container
                            flexDirection={ flexConstants.DIRECTION_ROW }
                            justifyContent={ flexConstants.POSITION_SPACER }
                        >
                            <Paragraph>{ name }</Paragraph>
                            <Icon
                                name="arrowRight"
                            />
                        </Container>
                    </Link>
                ) : (
                    <Fragment>
                        <Paragraph>{ name }</Paragraph>
                        { edit ? (
                            <Icon
                                name="trash"
                                color="red"
                                clickable
                                onClick={ (/* EVENT */) => handleGroupUnsubscribe(name) }
                            />
                        ) : (
                            <Icon
                                name="arrowRight"
                            />
                        ) }
                    </Fragment>
                ) }
            </Container>
        </SlideInRight>
    </ListItem>
);

SubscribedItem.propTypes = {
    handleClick: PropTypes.func,
    edit: PropTypes.bool,
    handleGroupUnsubscribe: PropTypes.func,
    isMobile: PropTypes.bool,
    name: PropTypes.string,
};

export default memo(SubscribedItem, (prevProps, nextProps) => (
    prevProps.isMobile === nextProps.isMobile && prevProps.name === nextProps.name && prevProps.edit === nextProps.edit
));
