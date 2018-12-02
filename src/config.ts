/**
 * Application config sample.
 *
 * REST_PATH - path to rest service.
 * SERVER_PORT - port number, set 80 for production.
 * SERVER_HOSTNAME - set real hostname for production.
 * SERVER_ADDRESS - hostname + port.
 * SERVER_REST_ADDRESS - hostname + port + rest path.
 * AUTHENTICATION - authentication configurations for each provider.
 */
export class AppConfig {
    static REST_PATH = 'rest';
    static SERVER_PORT = 3001;
    static SERVER_HOSTNAME = 'localhost';
    static SERVER_ADDRESS = `http://${AppConfig.SERVER_HOSTNAME}:${AppConfig.SERVER_PORT}`;
    static SERVER_REST_ADDRESS = `${AppConfig.SERVER_ADDRESS}/${AppConfig.REST_PATH}`;
    static AUTHENTICATION = {
        GOOGLE: {
            provider: 'google',
            password: 'cookie_encryption_password_secure',
            clientId: '196556193526-arf8m6in9vtgclg3q01ov6erhccc0588.apps.googleusercontent.com',
            clientSecret: 'bjHlp0zxg4Pdo86JkC5O6Z9A',
            isSecure: false
        }
    }
}
