import React from 'react';
import PropTypes from 'prop-types';

import { wrap, h } from './DescriptionWrap.module.css';

const DescriptionWrap = ({ message, children }) => (
    <div className={`container ${wrap}`}>
        <h3 className={h}>{message}</h3>
        {children}
    </div>
);

DescriptionWrap.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default DescriptionWrap;
