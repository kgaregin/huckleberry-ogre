import 'typeface-roboto';
import React from 'react';
import {render} from 'react-dom';
import {GlobalLayout} from './components/GlobalLayout';
import {Navigation} from './components/Navigation';
import {store, history} from './core/reduxStore';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {ErrorBoundary} from './components/ErrorBoundary';
import {ElectricForceField} from './modules/electricForceField/ElectricForceField';

<ErrorBoundary>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <GlobalLayout>
                <Navigation/>
            </GlobalLayout>
        </ConnectedRouter>
    </Provider>
</ErrorBoundary>;

render(
    <ElectricForceField/>,
    document.getElementById("root")
);