import {Dispatch} from "redux";
import {IWithClasses} from "../../core/Interfaces";
import {MODE} from "./Enums";
import {RouteComponentProps} from "react-router-dom";

/**
 * Blog model.
 */
export interface IBlog {
    form: {
        title: string;
        message: string;
    },
    isFetchInProgress: boolean
}

/**
 * Blog actions.
 */
export interface IBlogActions {
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch<null>) => Promise<{type: string, reason: string} | {type: string, responseValue: Response}>;
    handleFormInput: (fieldName: string, fieldValue: string) => void;
    submitBlogPost: (title: string, message: string) => (dispatch: Dispatch<null>) => Promise<{type: string, reason: string} | {type: string, responseValue: Response}>;
}

/**
 * Blog component props with classes, router and redux actions.
 */
export interface IBlogProps extends IBlog, IWithClasses, RouteComponentProps<{ mode: MODE }>{
    actions: IBlogActions
}
