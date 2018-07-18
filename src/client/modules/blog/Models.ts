import {Dispatch} from "redux";
import {FETCH_CONTEXT, MODE} from "./Enums";
import {IPost} from "../../../server/db/models/blog/post";
import {FETCH_STATUS} from "../../core/utils/ServiceUtils";
import {INavigationActions} from "../../core/modules/Navigation";


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
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch) => Promise<void>;
    handleFormInput: (fieldName: string, fieldValue: string) => {type: string; fieldName: string; fieldValue: string;};
    prefillPostEditForm: (post: IPost) => {type: string; post: IPost};
    clearPostEditForm: () => {type: string};
    submitBlogPost: (title: string, message: string, id?: number, mode?: MODE) => (dispatch: Dispatch) => Promise<void>;
    removePostByID: (id: string) => (dispatch: Dispatch) => Promise<void>
}

/**
 * Blog component props with classes, router and redux actions.
 */
export interface IBlogProps extends IBlog {
    actions: IBlogActions & INavigationActions
}
