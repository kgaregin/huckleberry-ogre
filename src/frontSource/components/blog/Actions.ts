export function getBlogPosts(){
    return {
        type: 'GET_BLOG_POSTS',
    }
}

export function handleFormInput(fieldName: string, fieldValue: string){
    return {
        type: 'HANDLE_FORM_INPUT',
        fieldName,
        fieldValue
    }
}