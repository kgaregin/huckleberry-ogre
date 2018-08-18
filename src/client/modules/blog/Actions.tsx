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
import {IBlogStateProps} from "./Blog";
import {IPost} from "../../../server/db/models";

/**
 * Action types.
 */
export const GET_BLOG_POSTS = 'GET_BLOG_POSTS';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const FILL_POST_EDIT_FORM = 'FILL_POST_EDIT_FORM';
export const CLEAR_POST_EDIT_FORM = 'CLEAR_POST_EDIT_FORM';
export const SET_REQUEST_STATUS = 'SET_REQUEST_STATUS';

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
    getBlogPosts = (posts: IPost[]) => this.dispatch({
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
            let request: Promise<IPost>;
            let notificationMessage: string;

            this.setRequestStatus(ERequestStatus.PENDING, 'submitStatus');

            switch (mode) {
                case EBlogViewMode.EDIT:
                    notificationMessage = 'Post updated';
                    request = put<IPost>('blog', {
                        id,
                        title,
                        message
                    });
                    break;
                case EBlogViewMode.CREATE:
                default:
                    notificationMessage = 'Post created';
                    request = post<IPost>('blog', {
                        title,
                        message
                    });
            }

            return request
                .then(
                    () => {
                        this.setRequestStatus(ERequestStatus.SUCCESS, 'submitStatus');
                        this.clearPostEditForm();
                        handleLocationChange('/blog');
                        notificationActions.show({
                            message: notificationMessage,
                            variant: ENotificationVariant.SUCCESS
                        });
                    },
                    reason => {
                        notificationMessage = 'Submit failed';
                        this.setRequestStatus(ERequestStatus.FAIL, 'submitStatus');
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
        dispatch => {
            const notificationActions = new NotificationActions(dispatch);
            this.setRequestStatus(ERequestStatus.PENDING, 'requestPostsStatus');

            return get<IPost[]>('blog', searchBy && removeEmptyFields(searchBy))
                .then(
                    response => {
                        this.getBlogPosts(response);
                        this.setRequestStatus(ERequestStatus.SUCCESS, 'requestPostsStatus');
                        if (matchParams && matchParams.mode === EBlogViewMode.EDIT && matchParams.postID) {
                            this.fillPostEditForm(+matchParams.postID);
                        }
                        return response;
                    },
                    reason => {
                        this.setRequestStatus(ERequestStatus.FAIL, 'requestPostsStatus');
                        notificationActions.show({
                            message: 'Request failed',
                            variant: ENotificationVariant.ERROR
                        });
                        return reason;
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
     * @param {string} propertyName Name of property to set.
     */
    setRequestStatus = (status: ERequestStatus, propertyName: keyof IBlogStateProps) => this.dispatch({
        type: SET_REQUEST_STATUS,
        payload: {
            status,
            propertyName
        }
    });

}
