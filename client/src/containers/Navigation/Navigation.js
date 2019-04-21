import React, { lazy, memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, lightTheme, FadeIn } from 'bachelor-ui';
import { UiContext } from '../../context/uiContext';
import SuspenseLoader from '../../components/SuspenseLoader';

const GroupList = lazy(() => import('../GroupList'));
const Setting = lazy(() => import( '../Setting'));

const containerStyle = { borderRight: `1px solid ${ lightTheme.lightGrey }` };
const MemoizedContainer = memo(({ isMobile, setting }) => (
    <Container style={ isMobile ? undefined : containerStyle } height="100vh">
        <SuspenseLoader>
            <FadeIn>
                { setting ? <Setting /> : <GroupList isMobile={ isMobile } /> }
            </FadeIn>
        </SuspenseLoader>
    </Container>
), (prevProps, nextProps) => prevProps.isMobile === nextProps.isMobile && prevProps.setting === nextProps.setting);

const Navigation = ({ isMobile }) => {
    const { state: { setting } } = useContext(UiContext);
    return (
        <MemoizedContainer isMobile={ isMobile } setting={ setting } />
    );
};

Navigation.propTypes = {
    isMobile: PropTypes.bool,
};

export default Navigation;
