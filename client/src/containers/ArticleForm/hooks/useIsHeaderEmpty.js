import { useContext } from 'react';
import { isNilOrEmptyString } from 'ramda-extension';
import { GroupContext } from '../../../context';

const useIsHeaderEmpty = () => {
    const { group: { messageID, selected } } = useContext(GroupContext);
    const isEmpty = isNilOrEmptyString(messageID) && isNilOrEmptyString(selected);
    return [isEmpty];
};

export default useIsHeaderEmpty;
