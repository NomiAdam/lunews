import Schema from './Schema';

const StarParams = {
    globalID: 'text NOT NULL',
    groupID: 'integer NOT NULL',
    userID: 'integer NOT NULL',
};

const AdditionalParams = `
FOREIGN KEY (userID) REFERENCES user(id),
FOREIGN KEY (globalID) REFERENCES articles(globalID),
FOREIGN KEY (groupID) REFERENCES groups(id),
PRIMARY KEY (userID, globalID)
`;

class Star extends Schema {

    public up(): Promise<any> {
        return this.create('star', StarParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('star');
    }

}

export default Star;
