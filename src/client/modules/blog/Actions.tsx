import {Action} from 'redux';
import {get, post, put, remove} from '../../core/utils/ServiceUtils';
import {EBlogViewMode} from './Enums';
import {removeEmptyFields} from '../../core/utils/Utils';
import {ERequestStatus} from '../../core/enums';
import {handleLocationChange, IAppState} from '../../core/reduxStore';
import {getPost} from './Utils';
import {ThunkDispatch} from 'redux-thunk';
import {NotificationActions} from '../notification/Actions';
import {ENotificationVariant} from '../notification/Notification';

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
export class BlogActions {
    constructor(private dispatch: ThunkDispatch<IAppState, void, Action>) {
    }

    /**
     * Receive all blog posts.
     *
     * @param {IPost[]} posts Blog posts.
     */
    getBlogPosts = (posts: Response) => this.dispatch({
        type: GET_BLOG_POSTS,
        payload: posts
    });

    /**
     * Clear post form.
     */
    clearPostEditForm = () => this.dispatch({
        type: CLEAR_POST_EDIT_FORM
    });

    /**
     * Submit blog post
     *
     * @param {number} id Post being updated identifier.
     * @param {EBlogViewMode} mode Blog view mode.
     */
    submitBlogPost = (id?: number, mode?: EBlogViewMode) => this.dispatch(
        (dispatch, getState) => {
            const notificationActions = new NotificationActions(dispatch);
            const {title, message} = getState().blogState.form;
            let request: Promise<Response>;
            let notificationMessage: string;

            this.setSubmitStatus(ERequestStatus.PENDING);

            switch (mode) {
                case EBlogViewMode.EDIT:
                    notificationMessage = 'Post updated';
                    request = put('blog', {
                        id,
                        title,
                        message
                    });
                    break;
                case EBlogViewMode.CREATE:
                default:
                    notificationMessage = 'Post created';
                    request = post('blog', {
                        title,
                        message
                    });
            }

            return request
                .then(
                    () => {
                        this.setSubmitStatus(ERequestStatus.SUCCESS);
                        this.clearPostEditForm();
                        handleLocationChange('/blog');
                        notificationActions.show({
                            message: notificationMessage,
                            variant: ENotificationVariant.SUCCESS
                        });
                    },
                    reason => {
                        notificationMessage = 'Submit failed';
                        this.setSubmitStatus(ERequestStatus.FAIL);
                        notificationActions.show({
                            message: notificationMessage,
                            variant: ENotificationVariant.ERROR
                        });

                        return reason;
                    }
                );
        }
    );

    /**
     * Submit blog post
     *
     * @param {number} [searchBy.id] Post identifier.
     * @param {string} [searchBy.title] Post title.
     * @param {string} [searchBy.message] Post message.
     */
    requestBlogPosts = (
        searchBy?: { id?: number, title?: string, message?: string },
        matchParams?: { mode?: EBlogViewMode, postID: string }
    ) => this.dispatch(
        () => {
            return get('blog', searchBy && removeEmptyFields(searchBy))
                .then(
                    response => {
                        this.getBlogPosts(response);
                        if (matchParams && matchParams.mode === EBlogViewMode.EDIT && matchParams.postID) {
                            this.fillPostEditForm(+matchParams.postID);
                        }
                        return response;
                    }
                );
        }
    );

    /**
     * Remove blog post.
     *
     * @param {string} id Post identifier.
     */
    removePostByID = (id: number) => this.dispatch(
        () => {
            const body = {id};
            return remove('blog', body)
                .then(
                    response => {
                        this.requestBlogPosts();
                        return response;
                    }
                );
        }
    );

    /**
     * Handle post edit.
     *
     * @param {number} postID Post identifier.
     */
    fillPostEditForm = (postID: number) => this.dispatch(
        (dispatch, getState) => {
            const post = getPost(getState().blogState.posts, postID);
            post && dispatch({
                type: FILL_POST_EDIT_FORM,
                payload: post
            });
        }
    );

    /**
     * Handle form input events.
     *
     * @param {string} fieldName Name of field.
     * @param {string} fieldValue Value.
     */
    handleFormInput = (fieldName: string, fieldValue: string) => this.dispatch({
        type: HANDLE_FORM_INPUT,
        payload: {
            fieldName,
            fieldValue
        }
    });

    /**
     * Set submit status.
     *
     * @param {ERequestStatus} status Status.
     */
    setSubmitStatus = (status: ERequestStatus) => this.dispatch({
        type: SET_SUBMIT_STATUS,
        payload: status
    });

}
