import { evolve, always } from 'ramda';
import { createReducer } from '../context/util';

export const filterActionTypes = {
    setFavourite: 'filter/SET_FAVOURITE',
    setSearch: 'filter/SET_SEARCH',
};

export default DEFAULT_STATE => createReducer(DEFAULT_STATE, {
    [ filterActionTypes.setFavourite ]: (state, { payload }) => ({
        ...state,
        filter: evolve(
            {
                favourite: always(payload),
            },
            state.filter,
        ),
    }),
    [ filterActionTypes.setSearch ]: (state, { payload }) => ({
        ...state,
        filter: evolve(
            {
                search: always(payload),
            },
            state.filter,
        ),
    }),
});
