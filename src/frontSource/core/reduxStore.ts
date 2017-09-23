import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import {blogInitial, blogReducer} from "../components/blog/Reducers";
import {IBlog} from "../components/blog/Models";
import thunkMiddleware from 'redux-thunk';

const combinedReducers = combineReducers({blogReducer});

const preloadedState = {
    blogReducer: {
        ...blogInitial.state
    }
};

// see docs at https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combinedReducers,
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware
        )
    )
);

export interface IReduxStore {
    blogReducer: IBlog
}