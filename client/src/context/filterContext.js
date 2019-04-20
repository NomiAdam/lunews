import React, { createContext, useReducer, useMemo } from 'react';
import filterReducer from '../reducers/filterReducer';

const DEFAULT_STATE = {
    filter: {
        favourite: false,
        search: '',
    },
};

export const FilterContext = createContext(DEFAULT_STATE);

export default ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer(DEFAULT_STATE), DEFAULT_STATE);
    const memoizedState = useMemo(
        () => ({ ...state, dispatch }),
        [state.filter.favourite, state.filter.search],
    );
    return (
        <FilterContext.Provider value={ memoizedState }>
            {children}
        </FilterContext.Provider>
    );
};
