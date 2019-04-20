import { putIntoDatabase, getFromDatabase, dbPromise } from './index';

export const TREE_TYPES = 'headers';
export const FAVOURITE_TRESS = 'favourites';

export const getTree = group => getFromDatabase(TREE_TYPES)(group);

export const setTree = (tree, group) => putIntoDatabase(TREE_TYPES)(tree, group);

export const getFavouriteTree = group => getFromDatabase(FAVOURITE_TRESS)(group);

export const seFavouriteTree = (tree, group) => putIntoDatabase(FAVOURITE_TRESS)(tree, group);

export const clearTreeDatabase = () => dbPromise.then((db) => {
    const tx = db.transaction(TREE_TYPES, 'readwrite');
    tx.objectStore(TREE_TYPES).clear().catch(console.error);
    return tx.complete;
});
