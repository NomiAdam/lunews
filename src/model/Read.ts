import Model from './Model';
import Group from './Group';

class Read extends Model {

    static get table(): string {
        return 'read';
    }

    // EXPERIMENTAL
    public async getReadList(userID: number, globalIDs: string[]) {
        let selectQuery = '';
        for (const globalID of globalIDs) {
            selectQuery += `'${globalID}',`;
        }
        const SQL = `SELECT globalID FROM ${Read.table} WHERE userID = ? AND globalID in (${selectQuery}0);`;
        const result = await this.RAW(SQL, [userID]);
        const ary: string[] = [];
        result.forEach((row: { globalID: string }) => ary.push(row.globalID));
        return ary;
    }

    public async addRead(userID: number, globalID: string, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `INSERT OR IGNORE INTO ${Read.table}(globalID, userID, groupID) values(?,?,?);`;
        return await this.RAW(SQL, [globalID, userID, id]);
    }

    public async getGroupCount(groupName: string) {
        const { id, numberOfArticles } = await Group.findOneByOne('name', groupName);
        const SQL = `SELECT count(groupID) as count from ${Read.table} WHERE groupID = ?`;
        const response = await this.RAW(SQL, [id]);
        const responseObject = response[0] || {};
        return numberOfArticles - (responseObject.count || 0);
    }

}

export default new Read();
