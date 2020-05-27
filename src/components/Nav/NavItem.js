import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { link } from './Nav.module.css';

const ativeStyle = {
    color: '#e6fd63',
};

const NavItem = ({ title }) => {
    const path = title === 'Home' ? '' : title.toLowerCase();
    return (
        <NavLink
            to={`/${path}`}
            exact
            activeStyle={ativeStyle}
            className={link}
        >
            {title}
        </NavLink>
    );
};

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default NavItem;
