import React from 'react';
import PropTypes from 'prop-types';

import { p } from './Notification.module.css';

const Notification = ({ message }) => <p className={p}>{message}!</p>;

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Notification;
