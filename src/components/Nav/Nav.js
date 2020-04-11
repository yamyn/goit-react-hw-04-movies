import React from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

import { list, item, navigation } from './Nav.module.css';

const Header = ({ items }) => (
    <nav className={navigation}>
        <ul className={list}>
            {items.map(title => (
                <li key={title} className={item}>
                    <NavItem title={title} />
                </li>
            ))}
        </ul>
    </nav>
);

// Header.propTypes = {
//     onClick: PropTypes.func.isRequired,
// };

export default Header;
