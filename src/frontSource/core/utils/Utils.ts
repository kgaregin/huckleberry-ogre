/**
 * Workaround for TS compiler.
 */
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {...ownProps, ...stateProps, ...dispatchProps};
}

/** Running mode */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';