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

CastList.propTypes = {
    actors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            character: PropTypes.string.isRequired,
            imageURL: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CastList;
