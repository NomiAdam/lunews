import Model from './Model';
import Profile from './Profile';

class GoogleUser extends Model {

    static get table(): string {
        return 'googleUser';
    }

    public async createGoogleUser(googleId: string, displayName: string, email: string = '') {
        const SQL = `INSERT OR IGNORE INTO ${GoogleUser.table}(googleId, displayName, email) values(?, ?, ?)`;
        await this.RAW(SQL, [googleId, displayName, email]);
        const { id } = await this.findByGoogleId(googleId);
        return await Profile.updateProfileSignature(id, displayName);
    }

    public async findById(id: number) {
        return await this.findOneByOne('id', id);
    }

    public async findByUsername(name: string) {
        return await this.findOneByOne('displayName', name);
    }

    public async findByGoogleId(id: string) {
        return await this.findOneByOne('googleId', id);
    }

}

export default new GoogleUser();
