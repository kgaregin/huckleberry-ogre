/**
 * Defines fetch status.
 */
export enum FETCH_STATUS {
    NONE,
    PENDING,
    SUCCESS,
    FAIL
}

/** Defines fetch context. */
export enum FETCH_CONTEXT {
    NONE,
    REQUEST_POSTS,
    SUBMIT_POST,
    UPDATE_POST,
    REMOVE_POST
}