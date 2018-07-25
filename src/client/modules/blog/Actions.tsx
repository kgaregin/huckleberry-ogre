//ToDo: add proper typings for "dispatch: any" from redux-thunk
import {Dispatch} from "redux";
import {FETCH_FAIL, FETCH_PENDING, FETCH_SUCCESS, get, post, put, remove} from "../../core/utils/ServiceUtils";
import {EBlogViewMode} from "./Enums";
import {IPost} from "../../../server/db/models/blog/post";
import {handleLocationChange} from "../../core/utils/Utils";
import {EFetchContext} from "../../core/enums";

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const FILL_POST_EDIT_FORM = 'FILL_POST_EDIT_FORM';
export const CLEAR_POST_EDIT_FORM = 'CLEAR_POST_EDIT_FORM';

/**
 * Blog actions.
 */
export interface IBlogActions {
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch) => Promise<void>;
    handleFormInput: (fieldName: string, fieldValue: string) => {type: string; fieldName: string; fieldValue: string;};
    fillPostEditForm: (post: IPost) => {type: string; post: IPost};
    clearPostEditForm: () => {type: string};
    submitBlogPost: (title: string, message: string, id?: number, mode?: EBlogViewMode) => (dispatch: Dispatch) => Promise<void>;
    removePostByID: (id: string) => (dispatch: Dispatch) => Promise<void>
}

/**
 * Receive all blog posts.
 *
 * @param {IPost[]} posts Blog posts.
 */
export const getBlogPosts = (posts: Response) => {
    return {
        type: GET_BLOG_POSTS,
        posts
    }
};

/**
 * Clear post form.
 */
export const clearPostEditForm = () => {
    return {
        type: CLEAR_POST_EDIT_FORM
    }
};

/**
 * Submit blog post
 *
 * @param {string} title Post title.
 * @param {string} message Post message.
 * @param {number} id Post identifier.
 * @param {EBlogViewMode} mode Blog view mode.
 */
export const submitBlogPost = (title: string, message: string, id?: number, mode?: EBlogViewMode) => {
    return (dispatch: any) => {
        dispatch(fetchPending(EFetchContext.SUBMIT_POST));
        const body = {
            id,
            title,
            message
        };
        let request: Promise<Response>;
        switch (mode) {
            case EBlogViewMode.EDIT:
                request = put('blog', body, {isPayloadGroomed: true});
                break;
            case EBlogViewMode.CREATE:
            default:
                request = post('blog', body, {isPayloadGroomed: true});
        }
        return request
            .then((responseValue: Response) => {
                    dispatch(fetchSuccess(EFetchContext.SUBMIT_POST, responseValue));
                    dispatch(clearPostEditForm());
                    dispatch(requestBlogPosts()).then(() => {
                        handleLocationChange('/blog')
                    });
                },
                reason => {
                    dispatch(fetchFail(EFetchContext.SUBMIT_POST, reason))
                }
            );
    }
};

/**
 * Submit blog post
 *
 * @param {number} [id] Post identifier.
 * @param {string} [title] Post title.
 * @param {string} [message] Post message.
 */
export const requestBlogPosts = (id?: number, title?: string, message?: string) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchPending(EFetchContext.REQUEST_POSTS));
        const payload = {
            id,
            title,
            message
        };
        return get('blog', payload, {isPayloadGroomed: true})
            .then(
                (response) => {
                    dispatch(fetchSuccess(EFetchContext.REQUEST_POSTS));
                    dispatch(getBlogPosts(response));
                },
                reason => {
                    dispatch(fetchFail(EFetchContext.REQUEST_POSTS, reason))
                }
            );
    }
};

/**
 * Remove blog post.
 *
 * @param {string} id Post identifier.
 */
export const removePostByID = (id: string) => {
    return (dispatch: any) => {
        dispatch(fetchPending(EFetchContext.REMOVE_POST));
        const body = {id};
        return remove('blog', body, {isPayloadGroomed: true})
            .then(
                () => {
                    dispatch(requestBlogPosts());
                    dispatch(fetchSuccess(EFetchContext.REMOVE_POST));
                },
                reason => {
                    dispatch(fetchFail(EFetchContext.REMOVE_POST, reason))
                }
            );
    }
};

/**
 * Handle post edit.
 *
 * @param {IPost} post
 */
export const fillPostEditForm = (post: IPost) => {
    return {
        type: FILL_POST_EDIT_FORM,
        post: post
    }
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
        fieldName,
        fieldValue
    }
};

/**
 * Handle fetch begin.
 *
 * @param {EFetchContext} context Fetch context.
 */
export const fetchPending = (context: EFetchContext) => {
    return {
        type: FETCH_PENDING,
        context
    }
};

/**
 * Handle fetch success.
 *
 * @param {EFetchContext} context Fetch context.
 * @param {Response} [responseValue] Response object.
 */
export const fetchSuccess = (context: EFetchContext, responseValue?: any) => {
    return {
        type: FETCH_SUCCESS,
        responseValue,
        context
    }
};

/**
 * Handle fetch fail.
 *
 * @param {EFetchContext} context Fetch context.
 * @param {string} reason Failure reason.
 */
export const fetchFail = (context: EFetchContext, reason: string) => {
    return {
        type: FETCH_FAIL,
        context,
        reason
    }
};

