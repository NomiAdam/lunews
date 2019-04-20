import passport from 'koa-passport';
import GoogleUser from '../model/GoogleUser';
// @ts-ignore
import Google from 'passport-google-oauth20';
import {keys} from '../config/keys';
import {DoneFunction, User, GoogleProfile} from './types/passport';
import Router = require('koa-router');
import {Context} from 'koa';

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: DoneFunction) => {
    try {
        const user: User = await GoogleUser.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default class PassportGoogleService {

    private static readonly callbackURL: string = '/auth/google/callback';
    private static readonly authURL: string = '/auth/google';
    private static readonly strategy: string = 'google';
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    useGoogleAuth() {
        const GoogleStrategy = Google.Strategy;
        passport.use(
            new GoogleStrategy(
                {
                    callbackURL: PassportGoogleService.callbackURL,
                    clientID: keys.clientID,
                    clientSecret: keys.clientSecret,
                    proxy: true
                },
                async (
                    accessToken: string,
                    refreshToken: string,
                    profile: GoogleProfile,
                    done: DoneFunction
                ) => {
                    try {
                        const existingUser = await GoogleUser.findByGoogleId(profile.id);
                        if (existingUser) {
                            return done(null, existingUser);
                        }
                        await GoogleUser.createGoogleUser(profile.id, profile.displayName, profile.emails[0].value);
                        const user = await GoogleUser.findByGoogleId(profile.id);
                        done(null, user);
                    } catch (err) {
                        done(err, null);
                    }
                }
            )
        );
    }

    defineGoogleAuthRouter() {
        this.router.get(
            PassportGoogleService.authURL,
            passport.authenticate(PassportGoogleService.strategy, {
                    scope: ['profile', 'email']
                },
            )
        );

        this.router.get(
            PassportGoogleService.callbackURL,
            passport.authenticate(PassportGoogleService.strategy),
            // @ts-ignore
            (ctx: Context) => {
                ctx.redirect('/');
            },
        );
    }

}
