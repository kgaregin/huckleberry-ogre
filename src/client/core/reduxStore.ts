import {combineReducers, createStore, applyMiddleware, compose, Store} from "redux";
import {blogReducer} from "../modules/blog/Reducers";
import thunkMiddleware from 'redux-thunk';
import {createHashHistory} from "history";
import {routerReducer, routerMiddleware, RouterState} from 'react-router-redux';
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
const composeEnhancers = (window as Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function}).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Hash history. */
export const history = createHashHistory();

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
            reactRouterReduxMiddleware,
        ))
);

