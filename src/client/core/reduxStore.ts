import {combineReducers, createStore, applyMiddleware, compose, Action} from 'redux';
import {blogState} from '../modules/blog/Reducers';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {createHashHistory, History} from 'history';
import {connectRouter, routerMiddleware, push, RouterState} from 'connected-react-router';
import {IBlogStateProps} from '../modules/blog/Blog';
import Route from 'route-parser';
import {EBlogViewMode} from '../modules/blog/Enums';
import {BlogActions} from '../modules/blog/Actions';
import {INotificationStateProps} from '../modules/notification/Notification';
import {notificationState} from '../modules/notification/Reducers';
import {dropZoneState} from '../modules/dropZone/Reducers';
import {DropZoneActions} from '../modules/dropZone/Actions';
import {IDropZoneStateProps} from '../modules/dropZone/DropZone';

/**
 * Combined reducers interface.
 *
 * @param {IBlogStateProps} Blog part of app state.
 */
export interface ICombinedReducers {
    blogState: IBlogStateProps;
    notificationState: INotificationStateProps;
    dropZoneState: IDropZoneStateProps;
}

/** Combined reducers. */
const combinedReducers = combineReducers<ICombinedReducers>(
    {
        blogState,
        dropZoneState,
        notificationState
    }
);

/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as Window & { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function }).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Hash history. */
export const history: History = createHashHistory();

/** Router middleware for store. */
const reactRouterReduxMiddleware = routerMiddleware(history);

/**
 * Main redux store interface.
 * Extends combined app reducers with router state.
 *
 * @prop {RouterState} router Router state.
 */
export interface IAppState extends ICombinedReducers {
    router: RouterState;
}

/**
 * Main redux store.
 */
export const store = createStore(
    connectRouter(history)(combinedReducers),
    composeEnhancers(
        applyMiddleware<ThunkDispatch<IAppState, void, Action>>(
            thunkMiddleware,
            reactRouterReduxMiddleware
        )
    )
);

/**
 * Handle redirect on new location for react-router.
 *
 * @param {string} newLocation Location relative path.
 */
export const handleLocationChange = (newLocation: string) => {
    store.dispatch(push(newLocation));
};

/**
 * History change listener.
 */
history.listen(location => {
    const blogPageRoute = new Route('/blog/(:mode)/(:postID)');
    const blogPageRouteMatch = blogPageRoute.match(location.pathname);
    const blogActions = new BlogActions(store.dispatch);
    const dropZoneActions = new DropZoneActions(store.dispatch);
    const enabledPaths = [`/blog/${EBlogViewMode.CREATE}`, `/blog/${EBlogViewMode.EDIT}`];
    const isDropZoneEnabled = enabledPaths.some(path => location.pathname.indexOf(path) !== -1);

    isDropZoneEnabled ? dropZoneActions.enable() : dropZoneActions.disable();

    if (location.pathname === '/blog') {
        blogActions.requestBlogPosts();
    }
    if (blogPageRouteMatch &&
        blogPageRouteMatch.mode === EBlogViewMode.EDIT &&
        blogPageRouteMatch.postID !== undefined) {
        blogActions.fillPostEditForm(+blogPageRouteMatch.postID);
    }
});


// history.listen(event => {
//
//     this.setState({isDropZoneEnabled: });
// });