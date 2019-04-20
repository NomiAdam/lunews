import React, { createContext, useMemo, useReducer } from 'react';
import groupReducer from '../reducers/groupReducer';

const DEFAULT_STATE = {
    group: {
        selected: 'hkfree.test',
        messageID: undefined,
        focusedMessage: undefined,
        isStarred: undefined,
    },
};

export const GroupContext = createContext(DEFAULT_STATE);

export default ({ children }) => {
    const [state, dispatch] = useReducer(groupReducer(DEFAULT_STATE), DEFAULT_STATE);
    const memoizedState = useMemo(
        () => ({ ...state, dispatch }),
        [state.group.selected, state.group.messageID, state.group.focusedMessage, state.group.isStarred],
    );
    return (
        <GroupContext.Provider value={ memoizedState }>
            {children}
        </GroupContext.Provider>
    );
};
