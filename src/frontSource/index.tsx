import "typeface-roboto";
import * as React from "react";
import {render} from "react-dom";
import {HashRouter as Router} from "react-router-dom";
import {GlobalLayout, Navigation} from "./core";
import {store} from "./core/store/reduxStore";
import {Provider} from "react-redux";

render(
    <Provider store={store}>
        <GlobalLayout>
            <Router>
                <Navigation/>
            </Router>
        </GlobalLayout>
    </Provider>,
    document.getElementById("root")
);