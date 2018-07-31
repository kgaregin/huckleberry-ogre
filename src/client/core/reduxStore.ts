import {combineReducers, createStore, applyMiddleware, compose, Store, AnyAction, Unsubscribe} from 'redux';
import {blogReducer} from '../modules/blog/Reducers';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {createHashHistory, History} from 'history';
import {connectRouter, routerMiddleware, push, RouterState} from 'connected-react-router';
import {IBlogOwnProps} from '../modules/blog/Blog';
import Route from 'route-parser';
import {EBlogViewMode} from '../modules/blog/Enums';
import {fillPostEditForm} from '../modules/blog/Actions';

/**
 * Combined reducers interface.
 *
 * @param {IBlogOwnProps} Blog part of app state.
 */
export interface ICombinedReducers {
    blogReducer: IBlogOwnProps;
}

/** Combined reducers. */
const combinedReducers = combineReducers<ICombinedReducers>(
    {
        blogReducer
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

/** Redux store adaptation. */
interface IStore extends Store<any> {
    dispatch: ThunkDispatch<IAppState, void, AnyAction>;
    getState(): IAppState;
    subscribe(listener: () => void): Unsubscribe;
}

/**
 * Main redux store.
 */
export const store: IStore = createStore(
    connectRouter(history)(combinedReducers),
    composeEnhancers(
        applyMiddleware(
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
    history.location.pathname !== newLocation && store.dispatch(push(newLocation));
};

/**
 * History change listener.
 */
history.listen(location => {
    const blogPageRoute = new Route('/blog/(:mode)/(:postID)');
    const blogPageRouteMatch = blogPageRoute.match(location.pathname);
    if (blogPageRouteMatch &&
        blogPageRouteMatch.mode === EBlogViewMode.EDIT &&
        blogPageRouteMatch.postID !== undefined) {
        store.dispatch(fillPostEditForm(+blogPageRouteMatch.postID));
    }
});