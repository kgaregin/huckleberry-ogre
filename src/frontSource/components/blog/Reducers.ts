import {Reducer} from "redux";
import {IBlog} from "./Models";

/**
 * Инициализирующее состояние стора.
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
 * Редюсер блога.
 */
export const blogReducer: Reducer<IBlog> = (state: IBlog = blogInitial.state, action) => {
    switch (action.type) {
        case 'GET_BLOG_POSTS':
            return {
                ...state,
                form: {
                    title: 'nope',
                    message: 'okay',
                }
            };
        case 'HANDLE_FORM_INPUT':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.fieldName]: action.fieldValue,
                }
            };
        default:
            return state;
    }
};