import Group from './Group';
import Model from './Model';

class Favourite extends Model {

    static get table(): string {
        return 'favourite';
    }

    public async assignFavourite(userID: number, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `INSERT OR IGNORE INTO ${Favourite.table}(groupID,userID) values(?,?);`;
        return await this.RAW(SQL, [id, userID]);
    }

    public async removeFavourite(userID: number, groupName: string) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `DELETE FROM ${Favourite.table} WHERE groupID = ? AND userID = ?;`;
        return await this.RAW(SQL, [id, userID]);
    }

    public async listFavourite(userID: number) {
        const SQL = `
        SELECT groups.name
        FROM groups
        INNER JOIN ${Favourite.table} ON groups.id = ${Favourite.table}.groupID
        WHERE ${Favourite.table}.userID = ?;
        `;
        return await this.RAW(SQL, [userID]);
    }

}

export default new Favourite();
