import {IS_DEVELOPMENT} from './Utils';
import {isObject, pickBy, identity} from 'lodash';
import {devServerPortNumber} from '../../../config';

/** Parts of url on server requests. */
const SERVER_ADDRESS = IS_DEVELOPMENT ? `http://localhost:${devServerPortNumber}/` : '/';
const REST = 'rest/';

/** Action types. */
export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

/** Options of request methods */
interface IRequestMethodOptions {
    /** Filtering undefined (unset) variables on given object. */
    isPayloadGroomed?: boolean;
    /** Automatically get json on response */
    isGettingJSON?: boolean;
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
            isPayloadGroomed: false,
            isGettingJSON: true
        };
        const {isPayloadGroomed, isGettingJSON} = {...defaultOptions, ...options} as IRequestMethodOptions;
        if (isObject(body)) {
            body = JSON.stringify(isPayloadGroomed ? pickBy(body, identity) : body);
        }
        const REQUEST_URL = `${SERVER_ADDRESS}${REST}${requestURL}${method === 'get' && body ? `?payload=${body}` : ''}`;
        let result = fetch(REQUEST_URL, method === 'get' ? {method} : {method, body});
        result = isGettingJSON ?
            result.then(
                response => response.json(),
                reason => console.log(reason)) :
            result;
        return result;
    };

    /** Main request methods. */
    public static get = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('get', REST_URL, body, options);
    public static post = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('post', REST_URL, body, options);
    public static put = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('put', REST_URL, body, options);
    public static remove = (REST_URL: string, body?: Object, options?: IRequestMethodOptions) => ServiceUtils.genericRequest('delete', REST_URL, body, options);

}

export const {get, post, put, remove} = ServiceUtils;

