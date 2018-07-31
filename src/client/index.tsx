import "typeface-roboto";
import * as React from "react";
import {render} from "react-dom";
import {GlobalLayout, Navigation} from "./components";
import {store, history} from "./core/reduxStore";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {ErrorBoundary} from "./components/ErrorBoundary";

render(
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <GlobalLayout>
                    <Navigation/>
                </GlobalLayout>
            </ConnectedRouter>
        </Provider>
    </ErrorBoundary>,
    document.getElementById("root")
);