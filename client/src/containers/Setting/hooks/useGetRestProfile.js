/* eslint-disable no-shadow */
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../../context';
import getRestProfile from '../../../api/profile/getProfile';
import { setErrorNotification } from '../../../actions/uiActions';

const useGetRestProfile = () => {
    const [signature, setSignature] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const { dispatch } = useContext(UiContext);
    useEffect(() => {
        getRestProfile()
            .then(({ signature, profile, email }) => {
                setSignature(signature);
                setDisplayName(profile);
                setEmail(email);
            })
            .catch(e => dispatch(setErrorNotification(e)));
    }, []);
    return [signature, setSignature, displayName, email];
};

export default useGetRestProfile;
