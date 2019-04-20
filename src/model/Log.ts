import Model from './Model';
import { ILog } from '../interfaces';

class Log extends Model {

    static get table(): string {
        return 'log';
    }

    public insertNewLog({ controller, method, errorMessage }: ILog) {
        const SQL = `INSERT OR IGNORE INTO
        ${Log.table}(dateTime, controller, method, errorMessage)
        VALUES(?, ?, ?, ?)`;
        this.RAW(SQL, [new Date().getUTCDate().toString(), controller, method, errorMessage])
            .then(() => console.log('Error logged'))
            .catch(console.log);
        return true;
    }

}

export default new Log();
