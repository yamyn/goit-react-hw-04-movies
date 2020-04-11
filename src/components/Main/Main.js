import React from 'react';
import PropTypes from 'prop-types';

import { main, h } from './Main.module.css';

const Main = ({ message, children }) => (
    <main className={`container ${main}`}>
        <h2 className={h}>{message}</h2>
        {children}
    </main>
);

Main.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Main;
