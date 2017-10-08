import {Reducer} from "redux";
import {IBlog} from "./Models";
import {
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT
} from './Actions'
import {FETCH_FAIL, FETCH_PENDING, FETCH_STATUS, FETCH_SUCCESS} from "../../core/utils/ServiceUtils";
import {FETCH_CONTEXT} from "./Enums";

/**
 * Initial blog state.
 */
export const blogInitial: {state: IBlog} = {
    get state() {
        return {
            posts: [],
            form: {
                title: '',
                message: ''
            },
            fetchStatus: FETCH_STATUS.NONE,
            fetchContext: FETCH_CONTEXT.NONE
        };
    }
};

/**
 * Blog reducer.
 */
export const blogReducer: Reducer<IBlog> = (state: IBlog = blogInitial.state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};