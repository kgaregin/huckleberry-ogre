import "typeface-roboto";
import * as React from "react";
import {render} from "react-dom";
import {Router} from "react-router-dom";
import {createHashHistory} from "history";
import {GlobalLayout, Navigation} from "./core";
import {store} from "./core/store/reduxStore";
import {Provider} from "react-redux";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

export const history = createHashHistory();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <GlobalLayout>
                <Navigation/>
            </GlobalLayout>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);