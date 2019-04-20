import { Keys } from './types/keys';

export default <Keys>{
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    cookieKey: process.env.COOKIE_KEY,
    hashKey: process.env.HASK_KEY,
    nntpHost: process.env.NNTP_IP,
    nntpPort: parseInt(<string>process.env.NNTP_PORT),
};
