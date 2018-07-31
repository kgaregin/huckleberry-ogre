import {AnyAction} from 'redux';
import {get, post, put, remove} from '../../core/utils/ServiceUtils';
import {EBlogViewMode} from './Enums';
import {TAsyncAction, removeEmptyFields, TReturnVoidAction} from '../../core/utils/Utils';
import {ERequestStatus} from '../../core/enums';
import {handleLocationChange} from '../../core/reduxStore';
import {getPost} from './BlogUtils';

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
    requestBlogPosts: (
        searchBy?: { id?: number, title?: string, message?: string },
        matchParams?: { mode?: EBlogViewMode, postID: string }
    ) => TAsyncAction;
    handleFormInput: (fieldName: string, fieldValue: string) => AnyAction;
    fillPostEditForm: (postID: number) => TReturnVoidAction;
    clearPostEditForm: () => AnyAction;
    submitBlogPost: (id?: number, mode?: EBlogViewMode) => TAsyncAction;
    removePostByID: (id: number) => TAsyncAction;
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
export const submitBlogPost = (id?: number, mode?: EBlogViewMode): TAsyncAction => {
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
 * @param {number} [searchBy.id] Post identifier.
 * @param {string} [searchBy.title] Post title.
 * @param {string} [searchBy.message] Post message.
 */
export const requestBlogPosts = (
    searchBy?: { id?: number, title?: string, message?: string },
    matchParams?: { mode?: EBlogViewMode, postID: string }
): TAsyncAction => {
    return (dispatch) => {
        return get('blog', searchBy && removeEmptyFields(searchBy))
            .then(
                response => {
                    dispatch(getBlogPosts(response));
                    if (matchParams && matchParams.mode === EBlogViewMode.EDIT && matchParams.postID) {
                        dispatch(fillPostEditForm(+matchParams.postID));
                    }
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
export const removePostByID = (id: number): TAsyncAction => {
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
 * @param {number} postID Post identifier.
 */
export const fillPostEditForm = (postID: number): TReturnVoidAction => {
    return (dispatch, getState) => {
        const post = getPost(getState().blogReducer.posts, postID);
        post && dispatch({
            type: FILL_POST_EDIT_FORM,
            payload: post
        });
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