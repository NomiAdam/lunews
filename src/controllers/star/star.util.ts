import {connection} from '../../services/nntp';
import Read from '../../model/Read';
import Star from '../../model/Star';

export const fetchStarredArticles = async (reference: string) => {
    try {
        await connection.connect();
        const remoteArticleBody = await connection.getArticleBody(reference);
        const remoteArticleHead = await connection.getArticleHead(reference);
        await connection.quit();
        const isStarred = await Star.getIsStarred(1, reference);
        await Read.addRead(1, reference, remoteArticleHead.groupName || '');
        return {
            body: remoteArticleBody,
            head: remoteArticleHead,
            starred: isStarred,
        };
    } catch (e) {
        console.log(e);
        return {};
    }
};
