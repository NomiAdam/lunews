import Schema from './Schema';

const GoogleUserParams = {
    id: 'integer PRIMARY KEY AUTOINCREMENT',
    googleId: 'text NOT NULL UNIQUE',
    displayName: 'text NOT NULL',
    email: 'text NULL',
};

class GoogleUser extends Schema {

    public up(): Promise<any> {
        return this.create('googleUser', GoogleUserParams, '');
    }

    public down(): Promise<any> {
        return this.drop('googleUser');
    }

}

export default GoogleUser;
