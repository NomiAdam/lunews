import { useContext } from 'react';
import { UiContext, UserContext } from '../../../context';
import setCachedProfile from '../../../api/profile/setCachedProfile';
import { setDarkMode, setDownloadSize, setOffline } from '../../../actions/userActions';
import { setErrorNotification } from '../../../actions/uiActions';

const useOfflineCache = () => {
    const { dispatch: UiDispatch } = useContext(UiContext);
    const { dispatch: UserDispatch } = useContext(UserContext);

    const saveDarkMode = value => setCachedProfile({ darkMode: value })
        .then(() => UserDispatch(setDarkMode(value)))
        .catch(e => UiDispatch(setErrorNotification(e)));

    const saveDownload = value => setCachedProfile({ downloadSize: value })
        .then(() => UserDispatch(setDownloadSize(value)))
        .catch(e => UiDispatch(setErrorNotification(e)));

    const saveOffline = value => setCachedProfile({ offline: value })
        .then(() => UserDispatch(setOffline(value)))
        .catch(e => UiDispatch(setErrorNotification(e)));

    return [saveDarkMode, saveDownload, saveOffline];
};

export default useOfflineCache;
