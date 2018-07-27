import {combineReducers, createStore, applyMiddleware, compose, Store} from 'redux';
import {blogReducer} from '../modules/blog/Reducers';
import thunkMiddleware from 'redux-thunk';
import {createHashHistory, History} from 'history';
import {routerReducer, routerMiddleware, RouterState, push} from 'react-router-redux';
import {IBlogOwnProps} from '../modules/blog/Blog';

/** Main redux store interface. */
export interface IAppState {
    blogReducer: IBlogOwnProps;
    routerReducer: RouterState;
}

/** Combined reducers. */
const combinedReducers = combineReducers<IAppState>(
    {
        blogReducer,
        routerReducer
    }
);
/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as Window & { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function }).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Hash history. */
export const history: History = createHashHistory();

const reactRouterReduxMiddleware = routerMiddleware(history);

/**
 * Main redux store.
 * @type {Store<IAppState>}
 */
export const store: Store<IAppState> = createStore(
    combinedReducers,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            reactRouterReduxMiddleware
        )
    )
);

/**
 * Handle redirect on new location for react-router.
 * @param {string} newLocation Location relative path.
 */
export const handleLocationChange = (newLocation: string) => {
    history.location.pathname !== newLocation && store.dispatch(push(newLocation));
};