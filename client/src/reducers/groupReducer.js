import { evolve, always } from 'ramda';
import { createReducer } from '../context/util';

export const groupActionTypes = {
    selectGroup: 'news/SELECT_GROUP',
    selectMessage: 'news/SELECT_MESSAGE',
    selectFocused: 'news/SELECT_FOCUSED',
    selectStarred: 'news/SELECT_STARRED',
};

export default DEFAULT_STATE => createReducer(DEFAULT_STATE, {
    [ groupActionTypes.selectGroup ]: (state, { payload } ) => ({
        ...state,
        group: evolve({ selected: always(payload) }, state.group),
    }),
    [ groupActionTypes.selectMessage ]: (state, { payload } ) => ({
        ...state,
        group: evolve({ messageID: always(payload) }, state.group),
    }),
    [ groupActionTypes.selectFocused ]: (state, { payload } ) => ({
        ...state,
        group: evolve({ focusedMessage: always(payload) }, state.group),
    }),
    [ groupActionTypes.selectStarred ]: (state, { payload } ) => ({
        ...state,
        group: evolve({ isStarred: always(payload) }, state.group),
    }),
});
