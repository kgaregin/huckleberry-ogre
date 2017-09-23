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
}

export interface IBlogProps extends IBlog{
    actions: IBlogActions
}

