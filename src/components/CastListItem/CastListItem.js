import React from 'react';
import PropTypes from 'prop-types';
import { figure, figcaption, imgWrap } from './CastListItem.module.css';

const CastListItem = ({ name, character, src }) => (
    <figure className={figure}>
        <div className={imgWrap}>
            <img src={src} alt={name} width="159" />
        </div>
        <figcaption className={figcaption}>
            <p>{name}</p>
            <p>{character}</p>
        </figcaption>
    </figure>
);

{
    /* ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
}; */
}

export default CastListItem;
