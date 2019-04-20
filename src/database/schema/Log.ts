import Schema from './Schema';

const LogParams = {
    id: 'integer PRIMARY KEY AUTOINCREMENT',
    dateTime: 'text NOT NULL',
    controller: 'text NOT NULL',
    method: 'text NOT NULL',
    errorMessage: 'text NOT NULL',
};

class Log extends Schema {

    public up(): Promise<any> {
        return this.create('log', LogParams);
    }

    public down(): Promise<any> {
        return this.drop('log');
    }

}

export default Log;
