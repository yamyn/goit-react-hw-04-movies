import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../MoviesListItem/MoviesListItem';
import { list, item } from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
    return (
        <ul className={`container ${list}`}>
            {movies.map(
                ({ id, title, date, vote, imageURL, originalTitle }) => (
                    <li key={id} className={item}>
                        <ImageGalleryItem
                            title={title}
                            date={date}
                            vote={vote}
                            src={imageURL}
                            alt={originalTitle}
                        />
                    </li>
                ),
            )}
        </ul>
    );
};

MoviesList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            vote: PropTypes.number.isRequired,
            imageURL: PropTypes.string.isRequired,
            originalTitle: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default MoviesList;
