import { useContext, useState } from 'react';
import { UiContext } from '../../../context';
import { setErrorNotification } from '../../../actions/uiActions';
import { clearTreeDatabase } from '../../../database/treeDatabase';

const useCacheClean = () => {
    const { dispatch: UiDispatch } = useContext(UiContext);
    const [cleared, setCleared] = useState(false);
    const clearFunc = () => clearTreeDatabase()
        .then(() => setCleared(true))
        .catch(e => UiDispatch(setErrorNotification(e)));
    return [cleared, clearFunc];
};

export default useCacheClean;
