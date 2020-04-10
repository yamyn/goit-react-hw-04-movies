import React from 'react';
import PropTypes from 'prop-types';
import { img, name, rate } from './MoviesListItem.module.css';

const MoviesListItem = ({ title, date, vote, src, alt }) => (
    <>
        <img className={img} src={src} alt={alt} />
        <p className={name}>
            {title} {date}
        </p>
        <p className={rate}>{vote}</p>
    </>
);

{
    /* ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
}; */
}

export default MoviesListItem;
