import {combineReducers, createStore, applyMiddleware, compose, Store} from "redux";
import {blogReducer} from "../../modules/blog/Reducers";
import {IBlog} from "../../modules/blog/Models";
import thunkMiddleware from 'redux-thunk';
import {commonReducer, ICommonState} from "./Reducers";

/**
 * Main redux store interface.
 */
export interface IReduxStore {
    blogReducer: IBlog,
    commonReducer: ICommonState
}

/** Combined reducers **/
const combinedReducers = combineReducers({blogReducer, commonReducer});
/** Enhancers. See docs at https://github.com/zalmoxisus/redux-devtools-extension **/
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Main redux store.
 * @type {Store<IReduxStore>}
 */
export const store: Store<IReduxStore> = createStore(
    combinedReducers,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware
        )
    )
);
