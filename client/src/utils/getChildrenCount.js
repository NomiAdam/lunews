import {
    o, length, keys, forEach,
} from 'ramda';

export const getChildrenSize = ({ children }) => {
    let childrenSize = 0;
    const size = o(length, keys)(children);
    childrenSize += size;
    forEach((key) => { childrenSize += getChildrenSize(children[ key ]); })(keys(children));
    return childrenSize;
};

export const getChildrenKeys = ({ children }) => {
    let childrenKeys = [];
    const iterationKeys = keys(children);
    childrenKeys = [...childrenKeys, ...iterationKeys];
    forEach((key) => {
        childrenKeys = [...childrenKeys, ...getChildrenKeys(children[ key ]) ];
    })(iterationKeys);
    return childrenKeys;
};
