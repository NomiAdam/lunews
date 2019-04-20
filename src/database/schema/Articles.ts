import Schema from './Schema';

const NewsParams = {
    date: 'text NOT NULL',
    globalID: 'text PRIMARY KEY UNIQUE',
    groupID: 'integer NOT NULL',
    numberID: 'text NOT NULL',
    reference: 'text NOT NULL',
    sender: 'text NOT NULL',
    subject: 'text NOT NULL',
};

const AdditionalParams = `
FOREIGN KEY (groupID) REFERENCES groups(id)
`;

class Articles extends Schema {

    public up(): Promise<any> {
        return this.create('articles', NewsParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('articles');
    }

}

export default Articles;
