import {IS_DEVELOPMENT} from './Utils';
import isEmpty from 'lodash/isEmpty';
import {devServerPortNumber} from '../../../config';
import {EResponseType} from '../enums';

/** Parts of url on server requests. */
const SERVER_ADDRESS = IS_DEVELOPMENT ? `http://localhost:${devServerPortNumber}/` : '/';
const REST = 'rest/';

/**
 * Options of request methods
 *
 * @prop {EResponseType} responseType If set, corresponding handler will be applied to response.
 */
interface IRequestMethodOptions {
    responseType?: EResponseType;
}

/**
 * Service layer helpers.
 */
class ServiceUtils {
    /**
     * Generic request constructor.
     *
     * @param {"get" | "post" | "put" | "delete"} method Request method (CRUD).
     * @param {string} requestURL Relative rest path.
     * @param {any} [body] Request body.
     * @param {IRequestMethodOptions} [options] Additional options.
     */
    private static genericRequest = (
        method: 'get' | 'post' | 'put' | 'delete',
        requestURL: string,
        body?: any,
        options?: IRequestMethodOptions
    ): Promise<Response> => {
        const defaultOptions: IRequestMethodOptions = {
            responseType: EResponseType.JSON
        };
        const {responseType} = {...defaultOptions, ...options} as IRequestMethodOptions;
        const REQUEST_URL = `${SERVER_ADDRESS}${REST}${requestURL}${method === 'get' && !isEmpty(body) ? `?payload=${body}` : ''}`;
        let result = fetch(REQUEST_URL, method === 'get' ? {method} : {method, body: JSON.stringify(body)});
        switch (responseType) {
            case EResponseType.JSON:
                result = result.then(
                    response => response.json(),
                    reason => console.log(reason)
                );
        }
        return result;
    };

    /**
     * Main request methods.
     */
    public static get = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('get', REST_URL, body, options);
    public static post = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('post', REST_URL, body, options);
    public static put = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('put', REST_URL, body, options);
    public static remove = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('delete', REST_URL, body, options);

}

export const {get, post, put, remove} = ServiceUtils;

