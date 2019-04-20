import Group from './Group';
import Model from './Model';

class Star extends Model {

    static get table(): string {
        return 'star';
    }

    public async getIsStarred(userID: number, globalID: string) {
        const SQL = `SELECT globalID FROM ${Star.table} WHERE userID = ? AND globalID = ? limit 1;`;
        const response = await this.RAW(SQL, [userID, globalID]);
        return response[0] !== undefined;
    }

    public async getStarListCount(userID: number, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `SELECT COUNT(*) as starred from ${Star.table} WHERE userID = ? AND groupID = ?;`;
        const response = await this.RAW(SQL, [userID, id]);
        return response[0].starred || 0;
    }

    public async getStarList(userID: number, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `
            SELECT
            articles.subject, articles.sender, articles.date, articles.globalID, articles.numberID, articles.reference
            FROM ${Star.table} INNER JOIN articles on ${Star.table}.globalID = articles.globalID
            WHERE ${Star.table}.userID = ? AND ${Star.table}.groupID = ? ORDER BY articles.date DESC;`;
        return await this.RAW(SQL, [userID, id]);
    }

    public async removeStar(userID: number, globalID: string) {
        const SQL = `DELETE FROM ${Star.table} WHERE globalID = ? AND userID = ?;`;
        return await this.RAW(SQL, [globalID, userID]);
    }

    public async addStar(userID: number, globalID: string, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `INSERT OR IGNORE INTO ${Star.table}(globalID, userID, groupID) values(?,?,?);`;
        return await this.RAW(SQL, [globalID, userID, id]);
    }

}

export default new Star();
