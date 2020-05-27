import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './components/App/App';

import 'material-design-icons/iconfont/material-icons.css';
import './style.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'),
);
