import { useState } from 'react';

const useIsRead = (unreadSize) => {
    const hasFlag = unreadSize === 0;
    const [isRead, setIsRead] = useState(hasFlag);
    return [isRead, setIsRead];
};

export default useIsRead;
