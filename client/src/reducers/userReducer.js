import { evolve, always } from 'ramda';
import { createReducer } from '../context/util';

export const userActionTypes = {
    loginUser: 'user/LOGIN_USER',
    logoutUser: 'user/LOGOUT_USER',
    setOffline: 'user/SET_OFFLINE',
    setDarkMode: 'user/SET_DARK_MODE',
    setDownloadSize: 'user/SET_DOWNLOAD',
};

export default DEFAULT_STATE => createReducer(DEFAULT_STATE, {
    [ userActionTypes.loginUser ]: (state, { payload }) => ({
        ...state,
        user: payload,
    }),
    [ userActionTypes.logoutUser ]: state => evolve({ user: always(DEFAULT_STATE.user) }, state),
    [ userActionTypes.setOffline ]: (state, { payload }) => ({
        ...state,
        config: evolve({ offline: always(payload) }, state.config),
    }),
    [ userActionTypes.setDownloadSize ]: (state, { payload }) => ({
        ...state,
        config: evolve({ downloadSize: always(payload) }, state.config),
    }),
    [ userActionTypes.setDarkMode ]: (state, { payload }) => ({
        ...state,
        config: evolve({ darkMode: always(payload) }, state.config),
    }),
});
