import { getConnectionInstance } from '../../services/nntp';
import Group from '../../model/Group';

export default class RefreshController {

    public static async refreshGroup(group: string) {
        try {
            const {name, lastArticleNumber, id} = await Group.getGroupInformation(group);
            const connection = getConnectionInstance();
            await connection.connect();
            const validGroupInformation = await connection.getGroup(name);
            await connection.quit();
            if (lastArticleNumber !== validGroupInformation.lastArticleNumber) {
                await Group.updateGroup(id, {
                    lastArticleNumber: validGroupInformation.lastArticleNumber,
                    numberOfArticles: validGroupInformation.numberOfArticles,
                });
            }
        } catch (e) {
            throw new Error('Something went wrong during group refresh');
        }
    }

    public static async refreshDatabase() {
        const groupList = await Group.getGroupList();
        for (const {name} of groupList) {
            await RefreshController.refreshGroup(name).catch(console.error);
        }
    }
}
