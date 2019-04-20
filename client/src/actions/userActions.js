import { createAction } from './utils/createAction';
import { userActionTypes } from '../reducers/userReducer';

export const setUser = createAction(userActionTypes.loginUser);

export const logoutUser = createAction(userActionTypes.logoutUser);
export const setOffline = createAction(userActionTypes.setOffline);
export const setDarkMode = createAction(userActionTypes.setDarkMode);
export const setDownloadSize = createAction(userActionTypes.setDownloadSize);
