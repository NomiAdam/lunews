import { useContext } from 'react';
import { GroupContext } from '../../../context';

const useIsFocused = (globalID) => {
    const { group: { focusedMessage } } = useContext(GroupContext);
    const isFocused = focusedMessage === globalID;
    return [isFocused];
};

export default useIsFocused;
