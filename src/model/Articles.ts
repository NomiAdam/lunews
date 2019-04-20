import Group from './Group';
import Model from './Model';

class Articles extends Model {

    static get table(): string {
        return 'articles';
    }

    public async insertNewArticle(groupName: string, article: any) {
        const { id } = await Group.findOneByOne('name', groupName);
        const SQL = `INSERT OR IGNORE INTO
        ${Articles.table}(groupID, date, globalID, numberID, reference, sender, subject)
        VALUES(${id}, ?, ?, ?, ?, ?, ?)`;
        return await this.RAW(SQL, [
            article.date, article.globalID, article.numberID, article.reference, article.sender, article.subject,
        ]);
    }

}

export default new Articles();
