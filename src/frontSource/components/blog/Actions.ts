import * as fetch from "isomorphic-fetch";
import {Dispatch} from "redux";

/**
 // ToDo: find out if i need this polyfill or babel-polyfill or both not needed (TS should do the job as i see)
 // import {polyfill as promiseAutoPolyfill} from "es6-promise";
 // promiseAutoPolyfill();
 */

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

/**
 *  Actions
 */

/**
 * Receive all blog posts.
 * @returns {{type: string}}
 */
export function getBlogPosts() {
    return {
        type: GET_BLOG_POSTS,
    }
}

/**
 * Create blog post
 * @param {string} title
 * @param {string} message
 * @returns {(dispatch: Dispatch<any>) => Promise<{type: string; reason: string} | {type: string; responseValue: Response}>}
 */
export function createBlogPost(title: string, message: string) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchBegin());
        return fetch('http://localhost:3000/rest/blog', {
            method: 'post',
            mode: 'no-cors',
            body: JSON.stringify({
                title,
                message
            })
        }).then((responseValue: Response) => dispatch(fetchSuccess(responseValue)),
            reason => dispatch(fetchFail(reason))
        );
    }
}

/**
 * Handles form input events.
 * @param {string} fieldName
 * @param {string} fieldValue
 * @returns {{type: string; fieldName: string; fieldValue: string}}
 */
export function handleFormInput(fieldName: string, fieldValue: string) {
    return {
        type: HANDLE_FORM_INPUT,
        fieldName,
        fieldValue
    }
}

/**
 * Handle fetch begin.
 * @returns {{type: string}}
 */
export function fetchBegin() {
    return {
        type: FETCH_BEGIN
    }
}

/**
 * Handle fetch success.
 * @param {Response} responseValue
 * @returns {{type: string; responseValue: Response}}
 */
export function fetchSuccess(responseValue: Response) {
    return {
        type: FETCH_SUCCESS,
        responseValue
    }
}

/**
 * Handle fetch fail.
 * @param {string} reason
 * @returns {{type: string; reason: string}}
 */
export function fetchFail(reason: string) {
    return {
        type: FETCH_FAIL,
        reason
    }
}

