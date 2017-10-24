import {IS_DEVELOPMENT} from "./Utils";
import * as fetch from "isomorphic-fetch";
import {isObject, pickBy, identity} from "lodash";

/**
 // ToDo: find out if i need this polyfill or babel-polyfill or both not needed (TS should do the job as i see)
 // import {polyfill as promiseAutoPolyfill} from "es6-promise";
 // promiseAutoPolyfill();
 */

/** Parts of url on server requests. */
export const SERVER_ADDRESS = IS_DEVELOPMENT ? 'http://localhost:3000/' : '/';
export const REST = 'rest/';

/** Options of request methods */
export interface IRequestMethodOptions {
    /** Filtering undefined (unset) variables on given object. */
    isPayloadGroomed?: boolean;
    /** Automatically get json on response */
    isGettingJSON?: boolean;
}

/** Action types. */
export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export class ServiceUtils {
    private static OptionsDefault: IRequestMethodOptions = {
        isPayloadGroomed: true,
        isGettingJSON: true
    };

    public static get = (REST_URL: string,
                         payload?: Object,
                         options?: IRequestMethodOptions) => {
        const {isPayloadGroomed, isGettingJSON} = options ? options : ServiceUtils.OptionsDefault;
        if (isObject(payload)) {
            payload = JSON.stringify(isPayloadGroomed ? pickBy(payload, identity) : payload);
        }
        payload = payload ? `?payload=${payload}` : ``;
        const REQUEST_URL = `${SERVER_ADDRESS}${REST}${REST_URL}${payload}`;
        let result = fetch(REQUEST_URL);
        result = isGettingJSON ?
            result.then(
                response => response.json(),
                reason => console.log(reason)) :
            result;
        return result;
    };

    public static post = (REST_URL: string,
                          body?: Object,
                          options?: IRequestMethodOptions) => {
        const {isPayloadGroomed, isGettingJSON} = options ? options : ServiceUtils.OptionsDefault;
        if (isObject(body)) {
            body = JSON.stringify(isPayloadGroomed ? pickBy(body, identity) : body);
        }
        let result = fetch(`${SERVER_ADDRESS}${REST}${REST_URL}`, {
            method: 'post',
            body
        });
        result = isGettingJSON ?
            result.then(
                response => response.json(),
                reason => console.log(reason)) :
            result;
        return result;
    };

    public static put = (REST_URL: string,
                          body?: Object,
                          options?: IRequestMethodOptions) => {
        const {isPayloadGroomed, isGettingJSON} = options ? options : ServiceUtils.OptionsDefault;
        if (isObject(body)) {
            body = JSON.stringify(isPayloadGroomed ? pickBy(body, identity) : body);
        }
        let result = fetch(`${SERVER_ADDRESS}${REST}${REST_URL}`, {
            method: 'put',
            body
        });
        result = isGettingJSON ?
            result.then(
                response => response.json(),
                reason => console.log(reason)) :
            result;
        return result;
    };

    public static remove = (REST_URL: string,
                          body?: Object,
                          options?: IRequestMethodOptions) => {
        const {isPayloadGroomed, isGettingJSON} = options ? options : ServiceUtils.OptionsDefault;
        if (isObject(body)) {
            body = JSON.stringify(isPayloadGroomed ? pickBy(body, identity) : body);
        }
        let result = fetch(`${SERVER_ADDRESS}${REST}${REST_URL}`, {
            method: 'delete',
            body
        });
        result = isGettingJSON ?
            result.then(
                response => response.json(),
                reason => console.log(reason)) :
            result;
        return result;
    }

}

/**
 * Defines fetch status.
 */
export enum FETCH_STATUS {
    NONE,
    PENDING,
    SUCCESS,
    FAIL
}