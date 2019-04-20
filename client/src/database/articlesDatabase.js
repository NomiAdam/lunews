import { putIntoDatabase, getFromDatabase, dbPromise } from './index';

export const MESSAGE_TYPE = 'articles';

export const getMessage = globalID => getFromDatabase(MESSAGE_TYPE)(globalID);

export const setMessage = (globalID, article) => putIntoDatabase(MESSAGE_TYPE)(article, globalID);

export const clearMessagesDatabase = () => dbPromise.then((db) => {
    const tx = db.transaction(MESSAGE_TYPE, 'readwrite');
    tx.objectStore(MESSAGE_TYPE).clear().catch(console.error);
    return tx.complete;
});
