import {Database} from 'sqlite3';
import db from '../database/db';

export default class Model {

    static get table(): string {
        return 'null';
    }

    public findOneByOne(findBy: string, value: string | number): Promise<any> {
        const database: Database = db.connect() as Database;

        // @ts-ignore
        const SQL = `SELECT * FROM ${this.constructor.table} where ${findBy} = ?`;

        return new Promise<any>((resolve, reject) => {
            database.get(SQL, [value], (err, row) => {
                database.close();
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(row);
            });
        });
    }

    public findOneByMultiple(findBy: object): Promise<any> {
        const database: Database = db.connect() as Database;

        const findByValues = Object.keys(findBy);
        const mappedFindByValues = findByValues.map(
            (val, index) => `${val} = ? ${index === (findByValues.length - 1) ? '' : 'AND'}`,
        );
        // @ts-ignore
        const SQL = `SELECT * FROM ${this.constructor.table} where ${mappedFindByValues.join(' ')} LIMIT 1;`;
        return new Promise<any>((resolve, reject) => {
            database.get(SQL, Object.values(findBy), (err, row) => {
                database.close();
                if (err) {
                    return reject(err);
                }
                if (row) {
                    resolve(row[0]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    public findMultipleByOne(findBy: string, value: string | number, limit: number): Promise<any> {
        const database: Database = db.connect() as Database;

        // @ts-ignore
        const SQL = `SELECT * FROM ${this.constructor.table} where ${findBy} = ? LIMIT ${limit}`;

        return new Promise<any>((resolve, reject) => {
            database.all(SQL, [value], (err, rows) => {
                database.close();
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    public findMultipleByMultiple(findBy: object, values: object, number: number): Promise<any> {
        const database: Database = db.connect() as Database;

        const findByValues = Object.values(findBy);
        const mappedFindByValues = findByValues.map(
            (val, index) => `${val} = ? ${index === (findByValues.length - 1) ? '' : 'AND'}`,
        );

        // @ts-ignore
        const SQL = `SELECT * FROM ${this.constructor.table} where ${mappedFindByValues.join(' ')} LIMIT ${number}`;

        return new Promise<any>((resolve, reject) => {
            database.all(SQL, Object.values(values), (err, rows) => {
                database.close();
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    public updateOneByOne(value: string, update: any, where: string, what: any): Promise<any> {
        const database: Database = db.connect() as Database;

        // @ts-ignore
        const SQL = `UPDATE ${this.constructor.table} SET ${value} = ? WHERE ${ where } = ? `;

        return new Promise<any>((resolve, reject) => {
            database.all(SQL, [value, what], (err, result) => {
                database.close();
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

    public RAW(SQL: string, values: any[]): Promise<any> {
        const database: Database = db.connect() as Database;
        return new Promise<any>((resolve, reject) => {
            database.all(SQL, values, (err, result) => {
                database.close();
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

}
