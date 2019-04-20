/* eslint-disable no-shadow,no-unused-vars */
import { useContext, useEffect } from 'react';
import { UserContext, UiContext } from '../../context';
import getProfile from '../../api/profile/getProfile';
import getCachedProfile from '../../api/profile/getCachedProfile';
import {
    setDarkMode, setDownloadSize, setOffline, setUser,
} from '../../actions/userActions';
import { setErrorNotification } from '../../actions/uiActions';

const useLocalCache = () => {
    const { dispatch: UserDispatch } = useContext(UserContext);
    const { dispatch: UiDispatch } = useContext(UiContext);
    useEffect(() => {
        getCachedProfile().then(({
            darkMode = false, offline = true, downloadSize = 120, profile, email,
        }) => {
            UserDispatch(setDarkMode(darkMode));
            UserDispatch(setOffline(offline));
            UserDispatch(setDownloadSize(downloadSize));
            UserDispatch(setUser({ profile, email }));
            getProfile().then(user => UserDispatch(setUser(user))).catch(e => UiDispatch(setErrorNotification(e)));
        }).catch(e => UiDispatch(setErrorNotification(e)));
    }, []);
};

export default useLocalCache;
