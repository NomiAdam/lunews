import Schema from './Schema';

const GroupParams = {
    firstArticleNumber: 'integer NOT NULL',
    id: 'integer PRIMARY KEY AUTOINCREMENT',
    lastArticleNumber: 'integer NOT NULL',
    name: 'text NOT NULL UNIQUE',
    numberOfArticles: 'integer NOT NULL',
};

class Group extends Schema {

    public up(): Promise<any> {
        return this.create('groups', GroupParams);
    }

    public down(): Promise<any> {
        return this.drop('groups');
    }

}

export default Group;
