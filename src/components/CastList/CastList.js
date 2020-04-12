import React from 'react';
import PropTypes from 'prop-types';

import CastListItem from '../CastListItem/CastListItem';
import { list, item } from './CastList.module.css';

const CastList = ({ actors }) => (
    <ul className={list}>
        {actors.map(({ id, name, character, imageURL }) => (
            <li key={id} className={item}>
                <CastListItem
                    name={name}
                    character={character}
                    src={imageURL}
                />
            </li>
        ))}
    </ul>
);

// Header.propTypes = {
//     onClick: PropTypes.func.isRequired,
// };

export default CastList;
