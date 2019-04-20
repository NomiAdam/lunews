import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import {
    List, ListItem, Container, Heading, Icon, flexConstants,
} from 'bachelor-ui';
import AvailableGroups from './AvailableGroups';
import SubscribedGroups from './SubscribedGroups';
import { UiContext } from '../../context/uiContext';
import Header from '../../components/Header';
import BackArrow from '../../components/BackArrow';
import { setSubscribe, setSetting, setEdit } from '../../actions/uiActions';

const GroupList = ({ isMobile }) => {
    const { dispatch, state: { subscribe, edit } } = useContext(UiContext);
    return (
        <Container
            alignItems={ flexConstants.POSITION_CENTER }
            justifyContent={ flexConstants.POSITION_CENTER }
            flexDirection={ flexConstants.DIRECTION_COLUMN }
            height="100vh"
        >
            {
                // eslint-disable-next-line no-nested-ternary
                subscribe ? (
                    edit ? (
                        <Header
                            headingChildren={ (
                                <Heading
                                    label="DONE"
                                    cursor="pointer"
                                    onClick={ (/* EVENT */) => dispatch(setEdit(false)) }
                                />
                            ) }
                        />
                    ) : (
                        <Header
                            headingChildren={ (
                                <Heading
                                    label="EDIT"
                                    cursor="pointer"
                                    onClick={ (/* EVENT */) => dispatch(setEdit(true)) }
                                />
                            ) }
                            actionChildren={ (
                                <Icon
                                    name="cog"
                                    fontSize="3em"
                                    clickable
                                    secondary
                                    onClick={ (/* EVENT */) => dispatch(setSetting(true)) }
                                />
                            ) }
                        />
                    )
                ) : (
                    <Header
                        before
                        actionChildren={ (
                            <BackArrow
                                handleBack={ (/* EVENT */) => dispatch(setSubscribe(true)) }
                                label="Subscribe"
                            />
                        ) }
                    />
                )
            }
            <Container height="90vh">
                <List>
                    {subscribe ? (
                        <SubscribedGroups isMobile={ isMobile } />
                    ) : (
                        <AvailableGroups handleClick={ (/* EVENT */) => dispatch(setSubscribe(true)) } />
                    )
                    }
                    {
                        edit || !subscribe ? null : (
                            <ListItem
                                disableHover
                                pointer
                                onClick={ (/* EVENT */) => dispatch(setSubscribe(false)) }
                                disableBorder
                            >
                                <Container
                                    padding="0 25px"
                                    flexDirection={ flexConstants.DIRECTION_ROW }
                                    justifyContent={ flexConstants.POSITION_RIGHT }
                                    alignItems={ flexConstants.POSITION_CENTER }
                                >
                                    <Heading component="h3" label="more" />
                                    <Icon name="add" fontSize="1.8em" />
                                </Container>
                            </ListItem>
                        )
                    }
                </List>
            </Container>
        </Container>
    );
};

GroupList.propTypes = {
    isMobile: PropTypes.bool,
};

export default memo(GroupList);
