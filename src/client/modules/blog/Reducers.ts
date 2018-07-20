import {Reducer} from 'redux';
import {
    CLEAR_POST_EDIT_FORM,
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT,
    PREFILL_POST_EDIT_FORM,
} from './Actions';
import {FETCH_FAIL, FETCH_PENDING, FETCH_STATUS, FETCH_SUCCESS} from '../../core/utils/ServiceUtils.ts';
import {FETCH_CONTEXT} from './Enums';
import {IBlogOwnProps} from './Blog';

/**
 * Initial blog state.
 */
export const initBlogState: IBlogOwnProps = {
    posts: [],
    form: {
        title: '',
        message: ''
    },
    fetchStatus: FETCH_STATUS.NONE,
    fetchContext: FETCH_CONTEXT.NONE,
    locationPathname: '/blog'
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
                fetchStatus: FETCH_STATUS.PENDING
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                fetchContext: action.context,
                fetchStatus: FETCH_STATUS.SUCCESS
            };
        case FETCH_FAIL:
            return {
                ...state,
                fetchContext: action.context,
                fetchStatus: FETCH_STATUS.FAIL
            };
        case PREFILL_POST_EDIT_FORM:
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