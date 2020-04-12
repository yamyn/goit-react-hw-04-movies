import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Nav from '../Nav/Nav';
import { wrap, header, logo, link } from './Header.module.css';

const Header = () => {
    const menu = ['Home', 'Movies'];
    return (
        <div className={wrap}>
            <header className={`${header} container`}>
                <h1 className={logo}>
                    <Link to="/" className={link}>
                        Online Cinema
                    </Link>
                </h1>
                <Nav items={menu} />
            </header>
        </div>
    );
};

export default Header;
