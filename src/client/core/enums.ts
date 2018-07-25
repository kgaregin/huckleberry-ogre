/** Defines fetch status. */
export enum EFetchStatus {
    NONE,
    PENDING,
    SUCCESS,
    FAIL
}

/** Defines fetch context. */
export enum EFetchContext {
    NONE,
    REQUEST_POSTS,
    SUBMIT_POST,
    UPDATE_POST,
    REMOVE_POST
}