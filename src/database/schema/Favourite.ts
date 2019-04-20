import Schema from './Schema';

const FavouriteParams = {
    groupID: 'integer NOT NULL',
    userID: 'integer NOT NULL',
};

const AdditionalParams = `
FOREIGN KEY (userID) REFERENCES user(id),
FOREIGN KEY (groupID) REFERENCES groups(id),
PRIMARY KEY (groupID, userID)
`;

class Favourite extends Schema {

    public up(): Promise<any> {
        return this.create('favourite', FavouriteParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('favourite');
    }

}

export default Favourite;
