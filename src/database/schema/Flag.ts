import Schema from './Schema';

const FlagParams = {
    flagID: 'integer NOT NULL',
    userID: 'integer NOT NULL',
};

const AdditionalParams = `
FOREIGN KEY (flagID) REFERENCES flag_types(id),
FOREIGN KEY (userID) REFERENCES user(id),
PRIMARY KEY (flagID, userID)
`;

class Flag extends Schema {

    public up(): Promise<any> {
        return this.create('flag', FlagParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('flag');
    }

}

export default Flag;
