/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Container, SearchField, flexConstants, Paragraph, Heading, lightTheme, osxTheme,
} from 'bachelor-ui';
import { setReply } from '../../actions/uiActions';
import { setSearch, setFavourite } from '../../actions/filterActions';
import {
    FilterContext, UiContext, GroupContext, UserContext,
} from '../../context';
import FormComposer from './FormComposer';

const flagStyle = { cursor: 'pointer', paddingLeft: '20px' };

const ArticleHeading = ({
    search, handleSetReply, isMobile, handleSetSearch, handleSetFavourite, darkMode, group,
}) => (
    <Container
        height="10vh"
        flexDirection={ flexConstants.DIRECTION_COLUMN }
    >
        { isMobile ? null : (
            <Container
                height={ isMobile ? '10vh' : '5vh' }
                flexDirection={ flexConstants.DIRECTION_ROW }
                justifyContent={ flexConstants.POSITION_SPACER }
                padding="10px 0 10px 10px"
            >
                <Heading label={ group } component="h4" />
                <FormComposer setFavourite={ handleSetReply } />
            </Container>
        ) }
        <Container
            height={ isMobile ? '10vh' : '5vh' }
            flexDirection={ flexConstants.DIRECTION_ROW }
            justifyContent={ flexConstants.POSITION_SPACER }
            backgroundColor={ darkMode ? osxTheme.lightColor : lightTheme.lightGrey }
        >
            <SearchField
                placeholder="Search"
                onChange={ (e, value) => handleSetSearch(value) }
                handleClear={ (/* EVENT */) => handleSetSearch('') }
                value={ search }
            />
            <Container
                justifyContent={ flexConstants.POSITION_RIGHT }
                backgroundColor={ lightTheme.transparent }
                padding="0 10px"
            >
                <div style={ flagStyle } onClick={ (/* EVENT */) => handleSetFavourite(false) }>
                    <Paragraph secondary>All</Paragraph>
                </div>
                <div style={ flagStyle } onClick={ (/* EVENT */) => handleSetFavourite(true) }>
                    <Paragraph secondary>Favourite</Paragraph>
                </div>
            </Container>
        </Container>
    </Container>
);

ArticleHeading.propTypes = {
    search: PropTypes.string,
    group: PropTypes.string,
    handleSetReply: PropTypes.func,
    isMobile: PropTypes.bool,
    handleSetSearch: PropTypes.func,
    handleSetFavourite: PropTypes.func,
    darkMode: PropTypes.bool,
};

const ArticleHeadingMemo = memo(ArticleHeading, (prevProps, nextProps) => (
    prevProps.isMobile === nextProps.isMobile
    && prevProps.group === nextProps.group
    && prevProps.search === nextProps.search
    && prevProps.darkMode === nextProps.darkMode
));

const SearchHeading = ({ isMobile }) => {
    const { filter: { search }, dispatch: filterDispatch } = useContext(FilterContext);
    const { dispatch: uiDispatch } = useContext(UiContext);
    const { group: { selected } } = useContext(GroupContext);
    const { config: { darkMode } } = useContext(UserContext);
    return (
        <ArticleHeadingMemo
            search={ search }
            handleSetSearch={ value => filterDispatch(setSearch(value)) }
            group={ selected }
            handleSetReply={ (/* EVENT */) => uiDispatch(setReply(true)) }
            handleSetFavourite={ value => filterDispatch(setFavourite(value)) }
            isMobile={ isMobile }
            darkMode={ darkMode }
        />
    );
};

SearchHeading.propTypes = {
    isMobile: PropTypes.bool,
};

export default SearchHeading;
