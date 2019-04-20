import { isNilOrEmpty } from 'ramda-extension';
import { map, prop } from 'ramda';
import handleRemoteRequest from '../../utils/api/index';
import {
    setGroups, getGroups,
} from '../../database/groupDatabase';

export const setSubscribedGroups = async groups => setGroups(groups);

export const fetchSubscribedGroups = () => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'GET',
        url: '/favourite',
        actions: {
            onRequest: [],
            onSuccess: [resolve, setSubscribedGroups],
            onError: [reject],
        },
    },
));

const validGroupFormat = map(prop('name'));
export default () => new Promise( async (resolve, reject) => {
    try {
        const groups = await fetchSubscribedGroups();
        resolve(validGroupFormat(groups));
    } catch (e) {
        const localGroups = await getGroups().catch(reject);
        if (isNilOrEmpty(localGroups)) {
            resolve([]);
        } else {
            resolve(localGroups);
        }
    }
});
