import sqliteModule, {Database} from 'sqlite3';

const sqlite = sqliteModule.verbose();
const databaseName = process.env.DATABASENAME || 'news.sqlite';

/**
 * Singleton SQL module
 */
class SQLiteDatabase {

    private readonly filename: string;
    private database: Database | null;

    constructor(filename: string) {
        this.filename = filename;
        this.database = null;
    }

    public connect(): Database {
        this.database = new sqlite.Database(this.filename, (err) => {
            if (err) {
                console.error(err);
            }
        });
        return this.database;
    }

    public disconnect(): void {
        if (this.database) { this.database.close(); }
        this.database = null;
    }
}

const instance: SQLiteDatabase = new SQLiteDatabase(databaseName);
export default instance;
