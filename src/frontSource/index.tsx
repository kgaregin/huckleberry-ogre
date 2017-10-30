import "typeface-roboto";
import * as React from "react";
import {render} from "react-dom";
import {GlobalLayout, Navigation} from "./core";
import {store, history} from "./core/store/reduxStore";
import {Provider} from "react-redux";
import {ConnectedRouter} from 'react-router-redux'
import {ErrorBoundary} from "./core/modules/ErrorBoundary";

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