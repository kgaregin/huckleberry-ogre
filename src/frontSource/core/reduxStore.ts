import {combineReducers, createStore} from "redux";
import {isFunction} from "lodash";
import {blogInitial, blogReducer} from "../components/blog/Reducers";
import {IBlog} from "../components/blog/Models";

const combinedReducers = combineReducers({blogReducer});

const preloadedState = {
    blogReducer:{
        ...blogInitial.state
    }
};

// see docs at https://github.com/zalmoxisus/redux-devtools-extension
const reduxDevtoolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const store = createStore(
    combinedReducers,
    preloadedState,
    isFunction(reduxDevtoolsExtension) && reduxDevtoolsExtension()
);

export interface IReduxStore {
    blogReducer: IBlog
}