import {Context} from 'koa';
import {errorResponse, successResponse} from '../../util/responseCreator';
import { getUserProfileObject } from './profile.utils';
import Log from '../../model/Log';

const PROFILE_CONTROLLER = 'profile-get';

export const getProfile = async (ctx: Context) => {
    try {
        const { id, displayName, email } = ctx.state.user;
        const { profile: { signature } } = await getUserProfileObject(id);
        return ctx.body = successResponse({ signature, displayName, email });
    } catch (e) {
        Log.insertNewLog({ method: 'getProfile', controller: PROFILE_CONTROLLER, errorMessage: `${e}` });
        ctx.status = 404;
        return ctx.body = errorResponse(e);
    }
};
