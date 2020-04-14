import React from 'react';
import PropTypes from 'prop-types';

import { wrap, button } from './BottomBtn.module.css';

const BottomBtn = ({ text, onClick }) => (
    <div className={wrap}>
        <button type="submit" onClick={onClick} className={button}>
            {text}
        </button>
    </div>
);

Notification.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BottomBtn;
