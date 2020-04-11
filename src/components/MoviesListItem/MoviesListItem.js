import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { img, name, rate } from './MoviesListItem.module.css';

const MoviesListItem = ({ id, title, date, vote, src, alt }) => (
    <Link to={`/movies/${id}`}>
        <img className={img} src={src} alt={alt} />
        <p className={name}>
            {title} {date}
        </p>
        <p className={rate}>{vote}</p>
    </Link>
);

{
    /* ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
}; */
}

export default MoviesListItem;
