import {Reducer} from 'redux';
import {
    CLEAR_POST_EDIT_FORM,
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT,
    FILL_POST_EDIT_FORM,
} from './Actions';
import {FETCH_FAIL, FETCH_PENDING, FETCH_SUCCESS} from '../../core/utils/ServiceUtils';
import {IBlogOwnProps} from './Blog';
import {EFetchContext, EFetchStatus} from "../../core/enums";

/**
 * Initial blog state.
 */
export const initBlogState: IBlogOwnProps = {
    posts: [],
    form: {
        title: '',
        message: ''
    },
    fetchStatus: EFetchStatus.NONE,
    fetchContext: EFetchContext.NONE
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
                posts: action.posts
            };
        case HANDLE_FORM_INPUT:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.fieldName]: action.fieldValue,
                }
            };
        case FETCH_PENDING:
            return {
                ...state,
                fetchContext: action.context,
                fetchStatus: EFetchStatus.PENDING
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                fetchContext: action.context,
                fetchStatus: EFetchStatus.SUCCESS
            };
        case FETCH_FAIL:
            return {
                ...state,
                fetchContext: action.context,
                fetchStatus: EFetchStatus.FAIL
            };
        case FILL_POST_EDIT_FORM:
            const {title, message} = action.post;
            return {
                ...state,
                form: {
                    ...state.form,
                    title,
                    message
                }
            };
        default:
            return state;
    }
};