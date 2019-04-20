import Schema from './Schema';

const ReadParams = {
    globalID: 'text NOT NULL',
    groupID: 'integer NOT NULL',
    userID: 'integer NOT NULL',
};

const AdditionalParams = `
FOREIGN KEY (groupID) REFERENCES groups(id)
FOREIGN KEY (userID) REFERENCES user(id),
FOREIGN KEY (globalID) REFERENCES articles(globalID),
PRIMARY KEY (userID, globalID)
`;

class Read extends Schema {

    public up(): Promise<any> {
        return this.create('read', ReadParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('read');
    }

}

export default Read;
