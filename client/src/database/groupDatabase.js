import { forEach } from 'ramda';
import { putIntoDatabase, deleteFromDatabase, getAllFromDatabase } from './index';

export const GROUP_TYPE = 'groups';

export const getGroups = (key = GROUP_TYPE) => getAllFromDatabase(GROUP_TYPE)(key);

export const deleteGroup = group => deleteFromDatabase(GROUP_TYPE)(group);

export const setGroup = group => putIntoDatabase(GROUP_TYPE)(group, group);

export const setGroups = groups => new Promise((resolve) => {
    const setGroupIntoDB = ({ name }) => setGroup(name);
    forEach(setGroupIntoDB, groups);
    resolve(groups);
});
