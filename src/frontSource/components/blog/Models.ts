import {Dispatch} from "redux";

export interface IBlog {
    form: {
        title: string;
        message: string;
    },
    isFetchInProgress: boolean
}

export interface IBlogActions {
    getBlogPosts: () => void;
    handleFormInput: (fieldName: string, fieldValue: string) => void;
    createBlogPost: (title: string, message: string) => (dispatch: Dispatch<null>) => Promise<{type: string, reason: string} | {type: string, responseValue: Response}>;
}

export interface IBlogProps extends IBlog{
    actions: IBlogActions
}

