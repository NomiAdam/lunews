import { getProfile, setProfile } from '../../database/profileDatabase';

export default async (settingObject) => {
    const profile = await getProfile();
    await setProfile({ ...profile, ...settingObject });
};
