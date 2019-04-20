import Model from './Model';

class Group extends Model {

    static get table(): string {
        return 'groups';
    }

    public async getGroupInformation(name: string) {
        return await this.findOneByOne('name', name);
    }

    public async getGroupList() {
        const SQL = `SELECT name FROM ${Group.table}`;
        return await this.RAW(SQL, []);
    }

    public async updateGroup(groupID: number, values: any) {
        const SQL = `UPDATE ${Group.table} SET numberOfArticles = ?, lastArticleNumber = ? WHERE id = ${groupID}`;
        return await this.RAW(SQL, Object.values(values));
    }

}

export default new Group();
