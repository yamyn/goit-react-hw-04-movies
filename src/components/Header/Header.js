import React from 'react';
import PropTypes from 'prop-types';

import { wrap, header, logo, link } from './Header.module.css';

const Header = ({ onClick }) => (
    <div className={wrap}>
        <header className={`${header} container`}>
            <h1 className={logo}>
                <a href="main" className={link} onClick={onClick}>
                    Online Cinema
                </a>
            </h1>
        </header>
    </div>
);

Header.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Header;
