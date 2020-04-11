import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App/App';

import 'material-design-icons/iconfont/material-icons.css';
import './style.css';

ReactDOM.render(
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>,
    document.querySelector('#root'),
);
