import {combineReducers, createStore, applyMiddleware, compose, Store, Reducer} from "redux";
import {blogReducer} from "../../modules/blog/Reducers";
import {IBlog} from "../../modules/blog/Models";
import thunkMiddleware from 'redux-thunk';
import {commonReducer, ICommonState} from "./Reducers";
import {history} from "../../";
import {routerReducer, routerMiddleware} from 'react-router-redux';

/**
 * Main redux store interface.
 */
export interface IReduxStore {
    blogReducer: IBlog,
    commonReducer: ICommonState
}

/** Combined reducers **/
const combinedReducers = combineReducers(
    {
        blogReducer,
        commonReducer,
        router: routerReducer
    }
);
/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function}).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reactRouterReduxMiddleware = routerMiddleware(history);

/**
 * Main redux store.
 * @type {Store<IReduxStore>}
 */
export const store: Store<IReduxStore> = createStore<any>(
    combinedReducers,
        applyMiddleware(
            thunkMiddleware,
            reactRouterReduxMiddleware,
        )
);

