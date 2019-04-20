/* eslint-disable import/prefer-default-export,no-prototype-builtins,consistent-return */

export const createReducer = (defaultState, actionHandlers) => {
    if (typeof defaultState !== 'object' || typeof actionHandlers !== 'object') {
        console.warn(`Wrong type of defaultState ${ typeof defaultState } or actionHandlers ${ typeof actionHandlers }`);
        console.warn('Expected both to be of type "object"');
    } else {
        return (state = defaultState, action) => {
            if (actionHandlers.hasOwnProperty(action.type)) {
                return actionHandlers[ action.type ](state, action);
            }
            return state;
        };
    }
};
