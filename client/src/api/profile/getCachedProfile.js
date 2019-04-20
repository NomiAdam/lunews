import { getProfile } from '../../database/profileDatabase';

export default async () => {
    const profile = await getProfile().catch(Promise.reject);
    if (profile) {
        return profile;
    }
    return { darkMode: false, offline: true, downloadSize: 120 };
};
