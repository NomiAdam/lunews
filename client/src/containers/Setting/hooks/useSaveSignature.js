import { useContext } from 'react';
import { UiContext } from '../../../context';
import setRestSignature from '../../../api/profile/setSignature';
import { setErrorNotification } from '../../../actions/uiActions';

const useSaveSignature = (signature) => {
    const { dispatch } = useContext(UiContext);
    const handlerFunc = () => setRestSignature(signature)
        .then(() => null)
        .catch(e => dispatch(setErrorNotification(e)));
    return [handlerFunc];
};

export default useSaveSignature;
