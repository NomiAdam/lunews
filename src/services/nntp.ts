import NNTP from 'entepe';
import { keys } from '../config/keys';

const options = {
    host: keys.nntpHost,
    port: keys.nntpPort || 119,
};

export { NNTP };

export const connection: NNTP = new NNTP(options);

export const getConnectionInstance = (): NNTP => new NNTP(options);
