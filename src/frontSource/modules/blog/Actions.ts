import {Dispatch} from "redux";
import {FETCH_FAIL, FETCH_PENDING, FETCH_SUCCESS, ServiceUtils} from "../../core/utils/ServiceUtils";
import {FETCH_CONTEXT, MODE} from "./Enums";
import {IPost} from "../../../server/db/models/blog/post";

const {get, post, put, remove} = ServiceUtils;

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const PREFILL_POST_EDIT_FORM = 'PREFILL_POST_EDIT_FORM';
export const CLEAR_POST_EDIT_FORM = 'CLEAR_POST_EDIT_FORM';

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
 * Clear post form.
 * @returns {{type: string}}
 */
export function clearPostEditForm() {
    return {
        type: CLEAR_POST_EDIT_FORM
    }
}

/**
 * Submit blog post
 * @param {string} title
 * @param {string} message
 * @param {number} id
 * @param {MODE} mode
 * @returns {Promise}
 */
export function submitBlogPost(title: string, message: string, id?: number, mode?: MODE) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchPending(FETCH_CONTEXT.SUBMIT_POST));
        const body = {
            id,
            title,
            message
        };
        let action;
        switch (mode) {
            case MODE.EDIT:
                action = put('blog', body);
                break;
            case MODE.CREATE:
            default:
                action = post('blog', body);
        }
        return action
            .then((responseValue: Response) => {
                    dispatch(clearPostEditForm());
                    dispatch(fetchSuccess(FETCH_CONTEXT.SUBMIT_POST, responseValue));
                },
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
        dispatch(fetchPending(FETCH_CONTEXT.REMOVE_POST));
        const body = {id};
        return remove('blog', body)
            .then(() => {
                    dispatch(fetchSuccess(FETCH_CONTEXT.REMOVE_POST));
                },
                reason => dispatch(fetchFail(FETCH_CONTEXT.REMOVE_POST, reason)))
    }
}

/**
 * Handles post edit.
 * @param {Partial<IPost>} post
 */
export function prefillPostEditForm(post: IPost) {
    return {
        type: PREFILL_POST_EDIT_FORM,
        post: post
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
