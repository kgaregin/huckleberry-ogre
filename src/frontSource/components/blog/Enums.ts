/**
 * Defines viewing mode of blog component.
 */
export enum MODE {
    READ = <any>'READ',
    CREATE = <any>'CREATE',
    UPDATE = <any>'UPDATE',
    REMOVE = <any>'REMOVE',
}

/**
 * Defines fetch context.
 */
export enum FETCH_CONTEXT {
    NONE,
    SUBMIT_POST,
    REQUEST_POSTS
}

