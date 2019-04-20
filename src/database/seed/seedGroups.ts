import {Database} from 'sqlite3';
import {connection} from '../../services/nntp';
import ProgressBar from '../../setup/ProgressBar';
import db from '../db';

const Bar = new ProgressBar();

export interface IGroupInformation {
    nameOfTheGroup: string;
    firstArticleNumber: number;
    lastArticleNumber: number;
    numberOfArticles: number;
}

const seedData = (row: IGroupInformation, db: Database): Promise<any> => new Promise((resolve, reject) => {
    const SQL = `
    INSERT OR IGNORE INTO
    groups(name, firstArticleNumber, lastArticleNumber, numberOfArticles)
    VALUES(?,?,?,?)
    `;

    db.run(
        SQL,
        [row.nameOfTheGroup, row.firstArticleNumber, row.lastArticleNumber, row.numberOfArticles],
        (err) => {
            if (err) { return reject(err); }
            resolve();
        },
    );
});

class GroupSeeder {

    public static run() {
        return new Promise(async (resolve, reject) => {

            await connection.connect();

            const groupList: string[] = await connection.listGroups();

            Bar.init(groupList.length, 'Fetching groups');

            const groupObjectsArray: IGroupInformation[] = [];

            for (const groupName of groupList) {
                const groupInformation: IGroupInformation = await connection.getGroup(groupName);
                groupObjectsArray.push(groupInformation);
                Bar.tick();
            }

            await connection.quit();

            const database: Database = db.connect() as Database;
            database.parallelize(async () => {

                Bar.init(groupObjectsArray.length, 'Seeding groups table');

                for (const row of groupObjectsArray) {
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

            await connection.connect();

            const groupList: string[] = await connection.listGroups();

            const groupObjectsArray: IGroupInformation[] = [];

            for (const groupName of groupList) {
                const groupInformation: IGroupInformation = await connection.getGroup(groupName);
                groupObjectsArray.push(groupInformation);
            }

            await connection.quit();

            const database: Database = db.connect() as Database;
            database.parallelize(async () => {

                for (const row of groupObjectsArray) {
                    await seedData(row, database).catch(reject);
                }

                db.disconnect();
                resolve();
            });
        });
    }

}

export default GroupSeeder;
