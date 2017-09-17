import 'typeface-roboto';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {HashRouter as Router} from 'react-router-dom';
import {GlobalLayout, Navigation} from './core';

ReactDOM.render(<div>
        <GlobalLayout>
            <Router>
                <Navigation/>
            </Router>
        </GlobalLayout>
    </div>
    ,
    document.getElementById("root")
);