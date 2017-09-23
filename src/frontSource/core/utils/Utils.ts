export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {...ownProps, ...stateProps, ...dispatchProps};
}