import { getFromDatabase, putIntoDatabase } from './index';

export const PROFILE_TYPE = 'profile';

export const getProfile = (profile = PROFILE_TYPE) => getFromDatabase(PROFILE_TYPE)(profile);

export const setProfile = (profile, key = PROFILE_TYPE) => putIntoDatabase(PROFILE_TYPE)(profile, key);
