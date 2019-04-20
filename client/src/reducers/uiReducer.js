import { evolve, always } from 'ramda';
import { createReducer } from '../context/util';

export const uiActionTypes = {
    assocNotification: 'ui/SET_NOTIFICATION',
    clearNotification: 'ui/CLEAR_NOTIFICATION',
    setNavigation: 'ui/SET_NAVIGATION',
    setSubscribe: 'ui/SET_SUBSCRIBE',
    setSetting: 'ui/SET_SETTING',
    setReply: 'ui/SET_REPLY',
    setEdit: 'ui/SET_EDIT',
    setFavourite: 'ui/SET_FAVOURITE',
    setSearch: 'ui/SET_SEARCH',
};

export default DEFAULT_STATE => createReducer(DEFAULT_STATE, {
    [ uiActionTypes.assocNotification ]: (state, { payload }) => ({
        ...state,
        ui: evolve(
            {
                notification: always(payload),
            },
            state.ui,
        ),
    }),
    [ uiActionTypes.clearNotification ]: state => ({
        ...state,
        ui: evolve(
            {
                notification: always(undefined),
            },
            state.ui,
        ),
    }),
    [ uiActionTypes.setNavigation ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                navigationOpen: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setSubscribe ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                subscribe: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setSetting ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                setting: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setReply ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                reply: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setEdit ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                edit: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setFavourite ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                favourite: always(payload),
            },
            state.state,
        ),
    }),
    [ uiActionTypes.setSearch ]: (state, { payload }) => ({
        ...state,
        state: evolve(
            {
                search: always(payload),
            },
            state.state,
        ),
    }),
});
