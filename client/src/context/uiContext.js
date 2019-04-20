import React, { createContext, useMemo, useReducer } from 'react';
import uiReducer from '../reducers/uiReducer';

const DEFAULT_STATE = {
    ui: {
        notification: undefined,
        type: 'error',
    },
    state: {
        reply: false,
        subscribe: true,
        setting: false,
        edit: false,
        navigationOpen: true,
    },
};

export const UiContext = createContext(DEFAULT_STATE);

export default ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer(DEFAULT_STATE), DEFAULT_STATE);
    const memoizedState = useMemo(
        () => ({ ...state, dispatch }),
        [
            state.state.reply,
            state.state.subscribe,
            state.state.setting,
            state.state.edit,
            state.state.navigationOpen,
            state.ui.notification,
            state.ui.type,
        ],
    );
    return (
        <UiContext.Provider value={ memoizedState }>
            {children}
        </UiContext.Provider>
    );
};
