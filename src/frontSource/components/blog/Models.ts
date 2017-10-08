import {Dispatch} from "redux";
import {IWithClasses} from "../../core/Interfaces";
import {FETCH_CONTEXT, MODE} from "./Enums";
import {RouteComponentProps} from "react-router-dom";
import {IPost} from "../../../server/db/models/blog/post";
import {FETCH_STATUS} from "../../core/utils/ServiceUtils";

/**
 * Blog model.
 */
export interface IBlog {
    posts: IPost[],
    form: {
        title: string;
        message: string;
    },
    fetchStatus: FETCH_STATUS,
    fetchContext: FETCH_CONTEXT
}

/**
 * Blog actions.
 */
export interface IBlogActions {
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch<null>) => Promise<{ type: string, reason: string } | { type: string, responseValue: Response }>;
    handleFormInput: (fieldName: string, fieldValue: string) => void;
    submitBlogPost: (title: string, message: string) => (dispatch: Dispatch<null>) => Promise<{ type: string, reason: string } | { type: string, responseValue: Response }>;
    removePostByID: (id: string) => (dispatch: Dispatch<null>) => Promise<{type: string, context: FETCH_CONTEXT, reason: string} | {type: string, context: FETCH_CONTEXT, responseValue: Response}>
}

/**
 * Blog component props with classes, router and redux actions.
 */
export interface IBlogProps extends IBlog, IWithClasses, RouteComponentProps<{ mode: MODE }> {
    actions: IBlogActions
}
