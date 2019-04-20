import Model from './Model';

class User extends Model {

    static get table(): string {
        return 'user';
    }

    public async createUser(name: string, email: string, password: string) {
        const SQL = `INSERT OR IGNORE INTO ${User.table}(name,email,password) values(?,?,?)`;
        return await this.RAW(SQL, [name, email, password]);
    }

    public async assignToken(name: string, token: string) {
        const SQL = `UPDATE ${User.table} SET token = ? WHERE name = ?`;
        return await this.RAW(SQL, [token, name]);
    }

    public async findByUsername(name: string) {
        return await this.findOneByOne('name', name);
    }

    public async findById(id: number) {
        return await this.findOneByOne('id', id);
    }

    public async findByToken(token: string) {
        return await this.findOneByOne('token', token);
    }

    public async updateUsername(name: string, id: number) {
        const SQL = `UPDATE ${User.table} SET name = ? where id = ?;`;
        return await this.RAW(SQL, [name, id]);
    }

}

export default new User();
