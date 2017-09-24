import {Reducer} from "redux";
import {IBlog} from "./Models";
import {
    GET_BLOG_POSTS,
    HANDLE_FORM_INPUT,
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAIL,
} from './Actions'

/**
 * Initial blog state.
 */
export const blogInitial = {
    get state() {
        return {
            form: {
                title: '',
                message: ''
            },
            isFetchInProgress: false
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
                form: {
                    title: 'nope',
                    message: 'okay',
                }
            };
        case HANDLE_FORM_INPUT:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.fieldName]: action.fieldValue,
                }
            };
        case FETCH_BEGIN:
            return {
                ...state,
                isFetchInProgress: true
            };
        case FETCH_SUCCESS:
        case FETCH_FAIL:
            return {
                ...state,
                isFetchInProgress: false
            };
        default:
            return state;
    }
};