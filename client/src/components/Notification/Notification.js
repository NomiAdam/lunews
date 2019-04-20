import React, {
    useContext, useRef, memo,
} from 'react';
import { Notification } from 'bachelor-ui';
import { o, not } from 'ramda';
import { isNilOrEmptyString } from 'ramda-extension';
import { UiContext } from '../../context/uiContext';
import { unsetNotification } from '../../actions/uiActions';

const useWithNotification = () => {
    const { dispatch, ui: { notification, type } } = useContext(UiContext);
    const hideNotification = useRef(() => dispatch(unsetNotification()));
    const isOpen = o(not, isNilOrEmptyString);
    return {
        hideNotification, isOpen: isOpen(notification), notification, type,
    };
};

const WithNotification = () => {
    const {
        hideNotification, isOpen, notification, type,
    } = useWithNotification();
    return (
        <Notification
            onClose={ hideNotification.current }
            open={ isOpen }
            message={ `${ notification }` }
            variant={ type }
        />
    );
};

export default memo(WithNotification);
