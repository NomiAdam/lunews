import React, { useState, useEffect, memo } from 'react';
import { Notification } from 'bachelor-ui';
import { pathOr, o, equals } from 'ramda';
import useIsOnline from 'use-is-online';

const getProtocolOrEmpty = pathOr('', ['location', 'protocol']);
const isHttps = o(equals('https:'), getProtocolOrEmpty);
const ConnectionNotification = () => {
    const { isOnline } = useIsOnline({ https: isHttps(window) });
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(!isOnline);
    }, [isOnline]);
    return (
        <Notification
            onClose={ setIsOpen }
            open={ isOpen }
            message="Připojení k internetu není dostupné"
            variant="warning"
        />
    );
};

export default memo(ConnectionNotification);
