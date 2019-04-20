import { createAction } from './utils/createAction';
import { filterActionTypes } from '../reducers/filterReducer';

export const setFavourite = createAction(filterActionTypes.setFavourite);
export const setSearch = createAction(filterActionTypes.setSearch);
