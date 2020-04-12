import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { p } from './Review.module.css';

const Review = ({ info }) => (
    <>
        <p className={p}>
            <span></span>
            {info}
        </p>
    </>
);

{
    /* ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
}; */
}

export default Review;
