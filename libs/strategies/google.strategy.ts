import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class googleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '611064116651-tteb5fjlp05gi8u4e2b4504kce2tqnfq.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/as-faberic/auth/google-callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accesToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accesToken,
        };

        done(null, user);
    }
}
