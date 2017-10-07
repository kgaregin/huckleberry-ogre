import {Dispatch} from "redux";
import {ServiceUtils} from "../../core/utils/ServiceUtils";

const {get, post} = ServiceUtils;

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

/**
 * Actions
 */

/**
 * Receive all blog posts.
 * @returns {Object}
 */
export function getBlogPosts(posts: any) {
    return {
        type: GET_BLOG_POSTS,
        posts
    }
}

/**
 * Submit blog post
 * @param {string} title
 * @param {string} message
 * @returns {Promise}
 */
export function submitBlogPost(title: string, message: string) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchBegin());
        const body = {
            title,
            message
        };
        return post('blog', body)
            .then((responseValue: Response) => dispatch(fetchSuccess(responseValue)),
                reason => dispatch(fetchFail(reason))
            );
    }
}

/**
 * Submit blog post
 * @param {number} [id]
 * @param {string} [title]
 * @param {string} [message]
 * @returns {Promise}
 */
export function requestBlogPosts(id?: number, title?: string, message?: string) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchBegin());
        const payload = {
            id: `${id}`,
            title,
            message
        };
        return get('blog', payload)
            .then(response => {
                    dispatch(fetchSuccess());
                    dispatch(getBlogPosts(response));
                },
                reason => console.log(reason))
    }
}

/**
 * Handles form input events.
 * @param {string} fieldName
 * @param {string} fieldValue
 * @returns {Object}
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
 * @param {Response} [responseValue]
 * @returns {Object}
 */
export function fetchSuccess(responseValue?: any) {
    return {
        type: FETCH_SUCCESS,
        responseValue
    }
}

/**
 * Handle fetch fail.
 * @param {string} reason
 * @returns {Object}
 */
export function fetchFail(reason: string) {
    return {
        type: FETCH_FAIL,
        reason
    }
}

