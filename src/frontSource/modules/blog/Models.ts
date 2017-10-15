import {Dispatch} from "redux";
import {IWithClasses} from "../../core/Interfaces";
import {FETCH_CONTEXT, MODE} from "./Enums";
import {RouteComponentProps} from "react-router-dom";
import {IPost} from "../../../server/db/models/blog/post";
import {FETCH_STATUS} from "../../core/utils/ServiceUtils";
import {INavigationActions} from "../../core/components/Navigation";
import {History} from "history";

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
    fetchContext: FETCH_CONTEXT,
    locationPathname: string
}

/**
 * Blog actions.
 */
export interface IBlogActions {
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch<null>) => Promise<{ type: string, reason: string } | { type: string, responseValue: Response }>;
    handleFormInput: (fieldName: string, fieldValue: string) => (dispatch: Dispatch<null>) => Object;
    prefillPostEditForm: (post: IPost) => (dispatch: Dispatch<null>) => Object;
    clearPostEditForm: () => (dispatch: Dispatch<null>) => Object;
    submitBlogPost: (title: string, message: string, id: number, mode: MODE) => (dispatch: Dispatch<null>) => Promise<{ type: string, reason: string } | { type: string, responseValue: Response }>;
    removePostByID: (id: string) => (dispatch: Dispatch<null>) => Promise<{ type: string, context: FETCH_CONTEXT, reason: string } | { type: string, context: FETCH_CONTEXT, responseValue: Response }>
}

/**
 * Blog component props with classes, router and redux actions.
 */
export interface IBlogProps extends IBlog, IWithClasses, RouteComponentProps<{ mode: MODE, postID: number }> {
    actions: IBlogActions & INavigationActions
}
