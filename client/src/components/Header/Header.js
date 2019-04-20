import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Container, Divider, lightTheme, flexConstants, osxTheme,
} from 'bachelor-ui';
import { UserContext } from '../../context';

const Header = ({ headingChildren, actionChildren, before }) => {
    const { config: { darkMode } } = useContext(UserContext);
    return (
        <div style={ { width: '100%', backgroundColor: darkMode ? osxTheme.darkBackground : lightTheme.lightGrey } }>
            <Container
                padding="10px"
                height="10vh"
                justifyContent={ flexConstants.POSITION_SPACER }
                flexDirection={ flexConstants.DIRECTION_ROW }
                alignItems={ flexConstants.POSITION_CENTER }
                backgroundColor={ darkMode ? osxTheme.lightColor : lightTheme.lightGrey }
            >
                {before && actionChildren}
                {headingChildren}
                {!before && actionChildren}
            </Container>
            <Divider color={ lightTheme.lightBlue } />
        </div>
    );
};

Header.propTypes = {
    headingChildren: PropTypes.node,
    actionChildren: PropTypes.node,
    before: PropTypes.bool,
};

export default memo(Header);
