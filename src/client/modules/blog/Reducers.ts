import {Reducer} from 'redux';
import {
    CLEAR_POST_EDIT_FORM,
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT,
    FILL_POST_EDIT_FORM,
    SET_REQUEST_STATUS,
} from './Actions';
import {IBlogStateProps} from './Blog';
import {ERequestStatus} from '../../core/enums';

/**
 * Initial blog state.
 */
export const initBlogState: IBlogStateProps = {
    posts: [],
    form: {
        title: '',
        message: ''
    },
    submitStatus: ERequestStatus.NONE,
    requestPostsStatus: ERequestStatus.NONE
};

/**
 * Blog reducer.
 */
export const blogState: Reducer<IBlogStateProps> = (state: IBlogStateProps = initBlogState, action) => {
    switch (action.type) {
        case CLEAR_POST_EDIT_FORM:
            return {
                ...state,
                form: {
                    title: '',
                    message: ''
                }
            };
        case GET_BLOG_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case HANDLE_FORM_INPUT:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.fieldName]: action.payload.fieldValue,
                }
            };
        case FILL_POST_EDIT_FORM:
            const {title, message} = action.payload;
            return {
                ...state,
                form: {
                    ...state.form,
                    title,
                    message
                }
            };
        case SET_REQUEST_STATUS:
            const {status, propertyName} = action.payload;
            return {
                ...state,
                [propertyName]: status
            };
        default:
            return state;
    }
};