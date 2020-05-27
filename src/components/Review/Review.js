import React from 'react';
import PropTypes from 'prop-types';
import { p } from './Review.module.css';

const Review = ({ info }) => (
    <>
        <p className={p}>
            <span />
            {info}
        </p>
    </>
);

Review.propTypes = {
    info: PropTypes.string.isRequired,
};
export default Review;
