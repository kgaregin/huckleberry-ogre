import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {GlobalLayout, Navigation} from './core';
import {Blog} from './components/blog/blog';

ReactDOM.render(<div>
        <GlobalLayout>
            <Router>
                <div>
                    <Navigation/>
                    <Route path="/" exact={true} component={Blog}/>
                    <Route path="/blog/post/:mode" component={Blog}/>
                </div>
            </Router>
        </GlobalLayout>
    </div>
    ,
    document.getElementById("root")
);