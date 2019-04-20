import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { useFetchSubscribed } from './hooks';
import SubscribedItem from './SubscribedItem';
import { GroupContext } from '../../context/groupContext';
import { UiContext } from '../../context/uiContext';
import { setActiveGroup } from '../../actions/groupActions';
import SuspenseLoader from '../../components/SuspenseLoader';

const SubscribedGroups = ({ isMobile }) => {
    const { dispatch } = useContext(GroupContext);
    return (
        <SuspenseLoader>
            <AsyncGroupList
                isMobile={ isMobile }
                handleClick={ groupName => dispatch(setActiveGroup(groupName)) }
            />
        </SuspenseLoader>
    );
};

SubscribedGroups.propTypes = {
    isMobile: PropTypes.bool,
};

const renderSubscribedGroups = (handleClick, edit, handleGroupUnsubscribe, isMobile) => map(
    name => (
        <SubscribedItem
            key={ name }
            handleClick={ handleClick }
            edit={ edit }
            handleGroupUnsubscribe={ handleGroupUnsubscribe }
            name={ name }
            isMobile={ isMobile }
        />
    ),
);

const AsyncGroupList = ({ isMobile, handleClick }) => {
    const { state: { edit } } = useContext(UiContext);
    const [groups, handleGroupUnsubscribe] = useFetchSubscribed();
    return groups
        ? renderSubscribedGroups(handleClick, edit, handleGroupUnsubscribe, isMobile)(groups)
        : null;
};

AsyncGroupList.propTypes = {
    isMobile: PropTypes.bool,
    handleClick: PropTypes.func,
};

export default memo(SubscribedGroups);
