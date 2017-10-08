import {Dispatch} from "redux";
import {FETCH_FAIL, FETCH_PENDING, FETCH_SUCCESS, ServiceUtils} from "../../core/utils/ServiceUtils";
import {FETCH_CONTEXT} from "./Enums";

const {get, post, remove} = ServiceUtils;

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';


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
        dispatch(fetchPending(FETCH_CONTEXT.SUBMIT_POST));
        const body = {
            title,
            message
        };
        return post('blog', body)
            .then((responseValue: Response) => dispatch(fetchSuccess(FETCH_CONTEXT.SUBMIT_POST, responseValue)),
                reason => dispatch(fetchFail(FETCH_CONTEXT.SUBMIT_POST, reason))
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
        dispatch(fetchPending(FETCH_CONTEXT.REQUEST_POSTS));
        const payload = {
            id,
            title,
            message
        };
        return get('blog', payload)
            .then((response) => {
                    dispatch(fetchSuccess(FETCH_CONTEXT.REQUEST_POSTS));
                    dispatch(getBlogPosts(response));
                },
                reason => dispatch(fetchFail(FETCH_CONTEXT.REQUEST_POSTS, reason)))
    }
}

/**
 *
 * @param {string} id
 * @returns {Promise}
 */
export function removePostByID(id: string) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchPending(FETCH_CONTEXT.DELETE_POST));
        const body = {id};
        return remove('blog', body)
            .then(() => {
                    dispatch(fetchSuccess(FETCH_CONTEXT.DELETE_POST));
                },
                reason => dispatch(fetchFail(FETCH_CONTEXT.DELETE_POST, reason)))
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
 * @param context
 * @returns {{type: string}}
 */
export function fetchPending(context: FETCH_CONTEXT) {
    return {
        type: FETCH_PENDING,
        context
    }
}

/**
 * Handle fetch success.
 * @param context
 * @param {Response} [responseValue]
 * @returns {Object}
 */
export function fetchSuccess(context: FETCH_CONTEXT, responseValue?: any) {
    return {
        type: FETCH_SUCCESS,
        responseValue,
        context
    }
}

/**
 * Handle fetch fail.
 * @param context
 * @param {string} reason
 * @returns {Object}
 */
export function fetchFail(context: FETCH_CONTEXT, reason: string) {
    return {
        type: FETCH_FAIL,
        context,
        reason
    }
}

