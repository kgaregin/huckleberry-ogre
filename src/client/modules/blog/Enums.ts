/** Defines viewing mode of blog component. */
export enum MODE {
    READ = <any>'READ',
    CREATE = <any>'CREATE',
    EDIT = <any>'EDIT',
    REMOVE = <any>'REMOVE',
}

/** Defines fetch context. */
export enum FETCH_CONTEXT {
    NONE,
    REQUEST_POSTS,
    SUBMIT_POST,
    UPDATE_POST,
    REMOVE_POST
}
