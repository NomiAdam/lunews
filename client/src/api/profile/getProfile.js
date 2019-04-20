import handleRemoteRequest from '../../utils/api';
import { setProfile, getProfile } from '../../database/profileDatabase';

export default () => new Promise((resolve, reject) => handleRemoteRequest(
    {
        method: 'GET',
        url: '/profile',
        actions: {
            onRequest: [],
            onSuccess: [async ({ displayName, email, signature }) => {
                const remoteProfile = { profile: displayName, email, signature };
                try {
                    const profile = await getProfile();
                    if (profile) {
                        const newProfile = {
                            ...profile,
                            ...remoteProfile,
                        };
                        await setProfile(newProfile);
                        resolve(remoteProfile);
                    } else {
                        await setProfile(remoteProfile);
                        resolve(remoteProfile);
                    }
                } catch (e) {
                    resolve(remoteProfile);
                }
            }],
            onError: [reject],
        },
    },
));
