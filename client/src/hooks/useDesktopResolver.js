import { useContext } from 'react';
import { isNilOrEmptyString } from 'ramda-extension';
import { GroupContext } from '../context';

export default () => {
    const { group: { messageID } } = useContext(GroupContext);
    return isNilOrEmptyString(messageID);
};
