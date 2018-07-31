import {AnyAction} from 'redux';
import {get, post, put, remove} from '../../core/utils/ServiceUtils';
import {EBlogViewMode} from './Enums';
import {IPost} from '../../../server/db/models/blog/post';
import {IAsyncAction, removeEmptyFields} from '../../core/utils/Utils';
import {ERequestStatus} from '../../core/enums';
import {handleLocationChange} from '../../core/reduxStore';

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const FILL_POST_EDIT_FORM = 'FILL_POST_EDIT_FORM';
export const CLEAR_POST_EDIT_FORM = 'CLEAR_POST_EDIT_FORM';
export const SET_SUBMIT_STATUS = 'SET_SUBMIT_STATUS';

/**
 * Blog actions.
 */
export interface IBlogActions {
    requestBlogPosts: (id?: number, title?: string, message?: string) => IAsyncAction;
    handleFormInput: (fieldName: string, fieldValue: string) => AnyAction;
    fillPostEditForm: (post: IPost) => AnyAction;
    clearPostEditForm: () => AnyAction;
    submitBlogPost: (id?: number, mode?: EBlogViewMode) => IAsyncAction;
    removePostByID: (id: string) => IAsyncAction;
}

/**
 * Receive all blog posts.
 *
 * @param {IPost[]} posts Blog posts.
 */
export const getBlogPosts = (posts: Response) => {
    return {
        type: GET_BLOG_POSTS,
        payload: posts
    };
};

/**
 * Clear post form.
 */
export const clearPostEditForm = () => {
    return {
        type: CLEAR_POST_EDIT_FORM
    };
};

/**
 * Submit blog post
 *
 * @param {number} id Post being updated identifier.
 * @param {EBlogViewMode} mode Blog view mode.
 */
export const submitBlogPost = (id?: number, mode?: EBlogViewMode): IAsyncAction => {
    return (dispatch, getState) => {
        dispatch(setSubmitStatus(ERequestStatus.PENDING));
        const {title, message} = getState().blogReducer.form;
        let request: Promise<Response>;
        switch (mode) {
            case EBlogViewMode.EDIT:
                request = put('blog', {
                    id,
                    title,
                    message
                });
                break;
            case EBlogViewMode.CREATE:
            default:
                request = post('blog', {
                    title,
                    message
                });
        }
        return request
            .then((responseValue: Response) => {
                    dispatch(setSubmitStatus(ERequestStatus.SUCCESS));
                    dispatch(clearPostEditForm());
                    dispatch(requestBlogPosts()).then(() => {
                        handleLocationChange('/blog');
                    });
                    return responseValue;
                },
                reason => {
                    dispatch(setSubmitStatus(ERequestStatus.FAIL));
                    return reason;
                }
            );
    };
};

/**
 * Submit blog post
 *
 * @param {number} [id] Post identifier.
 * @param {string} [title] Post title.
 * @param {string} [message] Post message.
 */
export const requestBlogPosts = (id?: number, title?: string, message?: string): IAsyncAction => {
    return (dispatch) => {
        const payload = {
            id,
            title,
            message
        };
        return get('blog', removeEmptyFields(payload))
            .then(
                response => {
                    dispatch(getBlogPosts(response));
                    return response;
                }
            );
    };
};

/**
 * Remove blog post.
 *
 * @param {string} id Post identifier.
 */
export const removePostByID = (id: string): IAsyncAction => {
    return (dispatch) => {
        const body = {id};
        return remove('blog', body)
            .then(
                response => {
                    dispatch(requestBlogPosts());
                    return response;
                }
            );
    };
};

/**
 * Handle post edit.
 *
 * @param {IPost} post
 */
export const fillPostEditForm = (post: IPost) => {
    return {
        type: FILL_POST_EDIT_FORM,
        payload: post
    };
};

/**
 * Handle form input events.
 *
 * @param {string} fieldName Name of field.
 * @param {string} fieldValue Value.
 */
export const handleFormInput = (fieldName: string, fieldValue: string) => {
    return {
        type: HANDLE_FORM_INPUT,
        payload: {
            fieldName,
            fieldValue
        }
    };
};

/**
 * Set submit status.
 *
 * @param {ERequestStatus} status Status.
 */
const setSubmitStatus = (status: ERequestStatus) => ({
    type: SET_SUBMIT_STATUS,
    payload: status
});