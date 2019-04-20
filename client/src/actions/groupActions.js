import { createAction } from './utils/createAction';
import { groupActionTypes } from '../reducers/groupReducer';

export const setActiveGroup = createAction(groupActionTypes.selectGroup);
export const setActiveMessage = createAction(groupActionTypes.selectMessage);
export const setFocusedMessage = createAction(groupActionTypes.selectFocused);
export const setIsStarred = createAction(groupActionTypes.selectStarred);
