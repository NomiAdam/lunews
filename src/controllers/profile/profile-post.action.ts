import {Context} from 'koa';
import Profile from '../../model/Profile';
import {errorResponse, successResponse} from '../../util/responseCreator';
import { getUserProfileObject } from './profile.utils';
import Log from '../../model/Log';

const PROFILE_CONTROLLER = 'profile-post';

export const updateProfileSignature = async (ctx: Context) => {
    try {
        const { id } = ctx.state.user;
        const { signature } = <{ signature: string }>ctx.request.body;
        await Profile.updateProfileSignature(id, signature);
        const user = await getUserProfileObject(id);
        return ctx.body = successResponse({ signature: user.profile.signature });
    } catch (e) {
        Log.insertNewLog({ method: 'updateProfileSignature', controller: PROFILE_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
