import Schema from './Schema';

const UserParams = {
    email: 'text NOT NULL UNIQUE',
    id: 'integer PRIMARY KEY AUTOINCREMENT',
    name: 'text NOT NULL UNIQUE',
    password: 'text NOT NULL',
    token: 'text NULL',
};

class User extends Schema {

    public up(): Promise<any> {
        return this.create('user', UserParams, '');
    }

    public down(): Promise<any> {
        return this.drop('user');
    }

}

export default User;
