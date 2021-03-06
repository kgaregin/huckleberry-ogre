import isEmpty from 'lodash/isEmpty';
import {AppConfig} from '../../../config';
import {EResponseType} from '../enums';
import {Omit} from '@material-ui/core'

/**
 * RequestInit parameters of fetch second argument.
 *
 * @prop {any} headers Request headers.
 */
type TRequestSettings = Omit<RequestInit, 'body' | 'method'> & {
    signal?: any
}

/**
 * Options of request methods
 *
 * @prop {EResponseType} [responseType] If set, corresponding handler will be applied to response.
 * @prop {boolean} [noWrap] If true, request body object won't be wrapped with JSON.stringify.
 * @prop {TRequestSettings} [requestSettings] RequestInit parameters of fetch second argument.
 */
interface IRequestMethodOptions {
    responseType?: EResponseType;
    noWrap?: boolean;
    requestSettings?: TRequestSettings;
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
    private static genericRequest = <TResponse>(
        method: 'get' | 'post' | 'put' | 'delete',
        requestURL: string,
        body?: any,
        options?: IRequestMethodOptions
    ): Promise<TResponse> => {
        const defaultOptions: IRequestMethodOptions = {
            responseType: EResponseType.JSON,
            noWrap: false,
            requestSettings: {}
        };
        const {responseType, noWrap, requestSettings} = {...defaultOptions, ...options} as IRequestMethodOptions;
        const REQUEST_URL = `${AppConfig.SERVER_REST_ADDRESS}/${requestURL}${method === 'get' && !isEmpty(body) ? `?payload=${body}` : ''}`;
        let result: Promise<any> = fetch(REQUEST_URL, method === 'get' ? {method} : {
            method,
            body: noWrap ? body : JSON.stringify(body), ...requestSettings
        });
        switch (responseType) {
            default:
            case EResponseType.JSON:
                result = result.then<TResponse>(
                    response => response.json(),
                    reason => {
                        console.log(reason);
                        return reason;
                    }
                );
        }
        return result;
    };

    /**
     * Main request methods.
     */
    public static get = <TResponse>(REST_URL: string, body?: any, options?: IRequestMethodOptions) => ServiceUtils.genericRequest<TResponse>('get', REST_URL, body, options);
    public static post = <TResponse>(REST_URL: string, body?: any, options?: IRequestMethodOptions) => ServiceUtils.genericRequest<TResponse>('post', REST_URL, body, options);
    public static put = <TResponse>(REST_URL: string, body?: any, options?: IRequestMethodOptions) => ServiceUtils.genericRequest<TResponse>('put', REST_URL, body, options);
    public static remove = <TResponse>(REST_URL: string, body?: any, options?: IRequestMethodOptions) => ServiceUtils.genericRequest<TResponse>('delete', REST_URL, body, options);

}

export const {get, post, put, remove} = ServiceUtils;

