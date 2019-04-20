import React, { createContext, useMemo, useReducer } from 'react';
import userReducer from '../reducers/userReducer';

const DEFAULT_STATE = {
    user: {
        email: undefined,
        profile: undefined,
    },
    config: {
        darkMode: false,
        offline: true,
        downloadSize: 1000,
    },
};

export const UserContext = createContext(DEFAULT_STATE);

export default ({ children }) => {
    const [state, dispatch] = useReducer(userReducer(DEFAULT_STATE), DEFAULT_STATE);
    const memoizedState = useMemo(
        () => ({ ...state, dispatch }),
        [
            state.user.email,
            state.user.profile,
            state.config.darkMode,
            state.config.offline,
            state.config.downloadSize,
        ],
    );
    return (
        <UserContext.Provider value={ memoizedState }>
            {children}
        </UserContext.Provider>
    );
};
