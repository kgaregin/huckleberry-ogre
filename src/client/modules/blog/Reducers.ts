import {Reducer} from 'redux';
import {
    CLEAR_POST_EDIT_FORM,
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT,
    FILL_POST_EDIT_FORM, SET_SUBMIT_STATUS,
} from './Actions';
import {IBlogOwnProps} from './Blog';
import {ERequestStatus} from "../../core/enums";

/**
 * Initial blog state.
 */
export const initBlogState: IBlogOwnProps = {
    posts: [],
    form: {
        title: '',
        message: ''
    },
    submitStatus: ERequestStatus.NONE,
};

/**
 * Blog reducer.
 */
export const blogReducer: Reducer<IBlogOwnProps> = (state: IBlogOwnProps = initBlogState, action) => {
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
        case SET_SUBMIT_STATUS:
            return {
                ...state,
                submitStatus: action.payload
            };
        default:
            return state;
    }
};