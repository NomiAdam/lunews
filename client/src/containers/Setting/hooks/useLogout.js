import { useContext } from 'react';
import { UiContext } from '../../../context';
import logoutUser from '../../../api/user/logoutUser';
import { setErrorNotification } from '../../../actions/uiActions';

const useLogout = () => {
    const { dispatch: UiDispatch } = useContext(UiContext);
    const logout = () => logoutUser()
        .then((/* RESPONSE */) => {
            window.location.href = '/';
        })
        .catch(e => UiDispatch(setErrorNotification(e)));
    return [logout];
};

export default useLogout;
