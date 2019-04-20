import schema from './database/schema';
import seed from './database/seed';

const Setup = async () => {
    try {
        for (const Schema of schema) {
            await new Schema().up();
        }
        for (const Seed of seed) {
            await Seed.withoutBar();
        }
    } catch (e) {
        console.log(e);
    }
};

Setup()
    .then(() => console.log('Done'))
    .catch(() => console.log('Error During Setup'));
