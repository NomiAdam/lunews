import Model from './Model';

class Profile extends Model {

    static get table(): string {
        return 'profile';
    }

    public async getProfile(userID: number) {
        return await this.findOneByOne('userID', userID);
    }

    public async updateProfileSignature(userID: number, signature: string) {
        const SQL = `INSERT OR REPLACE INTO ${Profile.table}(userID, signature) values(?, ?);`;
        return await this.RAW(SQL, [userID, signature]);
    }

}

export default new Profile();
