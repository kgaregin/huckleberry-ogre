import {combineReducers, createStore, applyMiddleware, compose, Store} from "redux";
import {blogReducer} from "../modules/blog/Reducers";
import thunkMiddleware from 'redux-thunk';
import {createHashHistory} from "history";
import {routerReducer, routerMiddleware, RouterState} from 'react-router-redux';
import {IBlogOwnProps} from '../modules/blog/Blog';

/** Main redux store interface. */
export interface IReduxStore {
    blogReducer: IBlogOwnProps;
    routerReducer: RouterState;
}

/** Hash history. */
export const history = createHashHistory();

/** Combined reducers **/
const combinedReducers = combineReducers<IReduxStore>(
    {
        blogReducer,
        routerReducer
    }
);
/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function}).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reactRouterReduxMiddleware = routerMiddleware(history);

/**
 * Main redux store.
 * @type {Store<IReduxStore>}
 */
export const store: Store<IReduxStore> = createStore(
    combinedReducers,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            reactRouterReduxMiddleware,
        ))
);

