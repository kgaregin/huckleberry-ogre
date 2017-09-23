import * as fetch from "isomorphic-fetch";
import {Dispatch} from "redux";

/**
 // ToDo: find out if i need this polyfill or babel-polyfill or both not needed (TS should do the job as i see)
 // import {polyfill as promiseAutoPolyfill} from "es6-promise";
 // promiseAutoPolyfill();
 */

export function getBlogPosts() {
    return {
        type: 'GET_BLOG_POSTS',
    }
}

export function createBlogPost(title: string, message: string) {
    return (dispatch: Dispatch<null>) => {
        dispatch(fetchBegin());
        return fetch('http://localhost:3000/rest/blog', {
            method: 'post',
            mode: 'no-cors',
            body: JSON.stringify({
                title,
                message
            })
        }).then((responseValue: Response) => dispatch(fetchSuccess(responseValue)),
            reason => dispatch(fetchFail(reason))
        );
    }
}

export function handleFormInput(fieldName: string, fieldValue: string) {
    return {
        type: 'HANDLE_FORM_INPUT',
        fieldName,
        fieldValue
    }
}

export function fetchBegin() {
    return {
        type: 'FETCH_BEGIN'
    }
}

export function fetchSuccess(responseValue: Response) {
    return {
        type: 'FETCH_SUCCESS',
        responseValue
    }
}

export function fetchFail(reason: string) {
    return {
        type: 'FETCH_FAIL',
        reason
    }
}

