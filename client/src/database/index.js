/* eslint-disable complexity */
import idb from 'idb';
import { GROUP_TYPE } from './groupDatabase';
import { TREE_TYPES, FAVOURITE_TRESS } from './treeDatabase';
import { PROFILE_TYPE } from './profileDatabase';
import { MESSAGE_TYPE } from './articlesDatabase';

export const dbPromise = idb.open('lunews', 1, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains(GROUP_TYPE)) {
        upgradeDB.createObjectStore(GROUP_TYPE);
    }
    if (!upgradeDB.objectStoreNames.contains(TREE_TYPES)) {
        upgradeDB.createObjectStore(TREE_TYPES);
    }
    if (!upgradeDB.objectStoreNames.contains(MESSAGE_TYPE)) {
        upgradeDB.createObjectStore(MESSAGE_TYPE);
    }
    if (!upgradeDB.objectStoreNames.contains(PROFILE_TYPE)) {
        upgradeDB.createObjectStore(PROFILE_TYPE);
    }
    if (!upgradeDB.objectStoreNames.contains(FAVOURITE_TRESS)) {
        upgradeDB.createObjectStore(FAVOURITE_TRESS);
    }
});

export const putIntoDatabase = type => (value, key) => dbPromise.then((db) => {
    const tx = db.transaction(type, 'readwrite');
    tx.objectStore(type).put(value, key).catch(console.error);
    return tx.complete;
});

export const deleteFromDatabase = type => key => dbPromise.then((db) => {
    const tx = db.transaction(type, 'readwrite');
    tx.objectStore(type).delete(key).catch(console.error);
    return tx.complete;
});

export const getAllFromDatabase = type => () => new Promise(async (resolve) => {
    const db = await dbPromise;
    const value = await db.transaction(type).objectStore(type).getAll();
    resolve(value);
});

export const getFromDatabase = type => key => new Promise(async (resolve) => {
    const db = await dbPromise;
    const value = await db.transaction(type).objectStore(type).get(key);
    resolve(value);
});
