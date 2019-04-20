import {Database} from 'sqlite3';
import ProgressBar from '../../setup/ProgressBar';
import db from '../db';
import flagTypes from './constants/flagTypes';

const Bar = new ProgressBar();

export interface INflagTypes {
    id: number;
    description: string;
}

const seedData = (row: INflagTypes, db: Database): Promise<any> => new Promise((resolve, reject) => {
    const SQL = `
    INSERT OR IGNORE INTO
    flag_types(id, description)
    VALUES(?,?)
    `;

    db.run(
        SQL,
        [row.id, row.description],
        (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        },
    );
});

class FlagTypesSeeder {

    public static run() {
        return new Promise(async (resolve, reject) => {
            const database: Database = db.connect() as Database;
            database.parallelize(async () => {

                Bar.init(flagTypes.length, 'Seeding flag_types table');

                for (const row of flagTypes) {
                    await seedData(row, database).catch(reject);
                    Bar.tick();
                }

                db.disconnect();
                resolve();
            });
        });
    }

    public static withoutBar() {
        return new Promise(async (resolve, reject) => {
            const database: Database = db.connect() as Database;
            database.parallelize(async () => {

                for (const row of flagTypes) {
                    await seedData(row, database).catch(reject);
                }

                db.disconnect();
                resolve();
            });
        });
    }

}

export default FlagTypesSeeder;
