import {Database} from "sqlite3";
import db from '../db';

class Schema {

    create(name: string, params: any, additionalParams?: string) {
        return new Promise((resolve, reject) => {
            const database: Database = db.connect() as Database;

            const keys: string[] = Object.keys(params);
            let query: string = '';

            keys.forEach((item, i) =>
                query += `${item} ${params[item]}${i === (keys.length - 1) ? '' : ','}\n`);

            const SQL = `
        CREATE TABLE IF NOT EXISTS ${name}
        (
        ${query}${additionalParams ? `,${additionalParams}` : ''}
        );`;

            database.serialize(() => {
                database.run(SQL, err => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                })
            });
        })
    }

    drop(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const database: Database = db.connect() as Database;
            database.serialize(() => {
                database.run(`DROP TABLE IF EXISTS ${name};`, err => {
                    if (err) {
                        reject();
                    }
                    resolve();
                });
            });
        })
    }

    up(): any {
    }

    down(): any {
    }

}

export default Schema;
