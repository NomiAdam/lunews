import Schema from './Schema';

const ProfileParams = {
    signature: 'text NULL',
    userID: 'integer PRIMARY KEY',
};

const AdditionalParams = `
FOREIGN KEY (userID) REFERENCES googleUser(id)
`;

class Profile extends Schema {

    public up(): Promise<any> {
        return this.create('profile', ProfileParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('profile');
    }

}

export default Profile;
