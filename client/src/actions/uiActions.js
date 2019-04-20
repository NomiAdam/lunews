import { createAction } from './utils/createAction';
import { uiActionTypes } from '../reducers/uiReducer';

export const setNotification = createAction(uiActionTypes.assocNotification);

export const setErrorNotification = e => createAction(uiActionTypes.assocNotification)(`Ops.. ${ e }`);

export const unsetNotification = createAction(uiActionTypes.clearNotification);
export const setNavigation = createAction(uiActionTypes.setNavigation);

export const setSubscribe = createAction(uiActionTypes.setSubscribe);
export const setSetting = createAction(uiActionTypes.setSetting);
export const setReply = createAction(uiActionTypes.setReply);
export const setEdit = createAction(uiActionTypes.setEdit);
