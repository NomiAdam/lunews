import Profile from '../../model/Profile';
import GoogleUser from '../../model/GoogleUser';

export const getUserProfileObject = async (userID: number) => {
    const profile = await Profile.getProfile(userID);
    const { name } = await GoogleUser.findById(userID);
    return { profile, username: name };
};
