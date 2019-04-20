import {Context} from 'koa';
import {getConnectionInstance} from '../../services/nntp';
import {errorResponse, successResponse} from '../../util/responseCreator';
import Log from '../../model/Log';
import fs from 'fs';
// @ts-ignore
import asyncBusboy from 'async-busboy';

const ARTICLE_CONTROLLER = 'article-post';

export const postArticle = async (ctx: Context) => {
    const { files, fields } = await asyncBusboy(ctx.req);
    const attachments = [];
    for ( const attachment of files ) {
        const fileContents = await fs.promises.readFile(attachment.path);
        attachments.push({ content: fileContents, filename: attachment.filename })
    }
    const { displayName, email } = ctx.state.user;
    const withUserCredentials = {
        ...fields,
        attachments,
        email,
        from: displayName,
    };
    try {
        const connection = getConnectionInstance();
        await connection.connect();
        const response = await connection.postArticle(withUserCredentials);
        await connection.quit();
        return ctx.body = successResponse(response.response);
    } catch (e) {
        console.log(e);
        Log.insertNewLog({method: 'postArticle', controller: ARTICLE_CONTROLLER, errorMessage: `${e}`});
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
