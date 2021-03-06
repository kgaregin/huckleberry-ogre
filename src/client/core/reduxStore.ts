import {combineReducers, createStore, applyMiddleware, compose, Action} from 'redux';
import {blogState} from '../modules/blog/Reducers';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {createBrowserHistory, History} from 'history';
import {connectRouter, routerMiddleware, push, RouterState} from 'connected-react-router';
import {IBlogStateProps} from '../modules/blog/Blog';
import {INotificationStateProps} from '../modules/notification/Notification';
import {IDropZoneStateProps} from '../modules/dropZone/DropZone';
import {ILoginStateProps} from "../modules/login/Login";
import {notificationState} from '../modules/notification/Reducers';
import {dropZoneState} from '../modules/dropZone/Reducers';
import {loginState} from "../modules/login/Reducers";

/**
 * Combined reducers interface.
 *
 * @param {IBlogStateProps} Blog part of app state.
 */
export interface ICombinedReducers {
    blogState: IBlogStateProps;
    notificationState: INotificationStateProps;
    dropZoneState: IDropZoneStateProps;
    loginState: ILoginStateProps;
}

/** Combined reducers. */
const combinedReducers = combineReducers<ICombinedReducers>(
    {
        blogState,
        dropZoneState,
        notificationState,
        loginState
    }
);

/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as Window & { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function }).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Hash history. */
export const history: History = createBrowserHistory();

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
            reactRouterReduxMiddleware,
            thunkMiddleware
        )
    )
);

/**
 * Navigate to given location.
 *
 * @param {string} newLocation Location relative path.
 */
export const navigateTo = (newLocation: string) => {
    store.dispatch(push(newLocation));
};
