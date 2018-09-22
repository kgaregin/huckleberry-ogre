import {Server, ServerRoute, AuthCredentials, RequestQuery} from 'hapi';
import {UserActions} from '../db/actions';
import {ERole} from '../db/models';
import path from 'path';

const distDirectory = path.join(__dirname, '../../../dist');

/**
 * Google authentication response object.
 */
interface AuthCredentialsGoogle extends AuthCredentials {
    expiresIn: number;
    query: RequestQuery;
    profile: {
        displayName: string;
        email: string;
        id: string;
        name: {
            // given_name === first name
            given_name: string;
            family_name: string;
        }
        raw: {
            sub: string;
            name: string;
            given_name: string;
            family_name: string;
            profile: string;
            picture: string;
            email: string;
            email_verified: boolean;
            locale: string;
        }
    }
    provider: 'google';
    token: string;
}

/**
 * Home routes configuration.
 */
const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/rest/login/google',
        options: {
            auth: 'google',
            files: {
                relativeTo: distDirectory
            }
        },
        handler: (request, handler) => {
            const credentials = request.auth.credentials as AuthCredentialsGoogle;
            const queryParams = credentials.query as RequestQuery;
            const redirectTo = queryParams.redirectTo || '/';

            handler.state('redirectTo', redirectTo, {encoding: 'base64', isSecure: false, isHttpOnly: false});

            return UserActions.getUser({googleId: credentials.profile.id})
                .then(user => {
                    if (!user) {
                        return UserActions.getUser().then(
                            hasAnyUser => {
                                return UserActions.newUser(
                                    {
                                        name: credentials.profile.displayName,
                                        email: credentials.profile.email,
                                        avatarURL: credentials.profile.raw.picture,
                                        googleId: credentials.profile.id,
                                        role: hasAnyUser ? ERole.USER : ERole.ADMIN,
                                    }
                                ).then(user => {
                                    handler.state('user', user, {encoding: 'base64json', isSecure: false, isHttpOnly: false});
                                    return handler.file('./index.html');
                                });
                            }
                        );
                    } else {
                        handler.state('user', user, {encoding: 'base64json', isSecure: false, isHttpOnly: false});
                        return handler.file('./index.html');
                    }
                });
        }
    }
];

export const LoginRoute = (server: Server) => server.route(routes);