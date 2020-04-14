import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { img, name, rate } from './MoviesListItem.module.css';

const MoviesListItem = ({ id, title, date, vote, src, alt, location }) => {
    return (
        <Link
            to={{
                pathname: `/movies/${id}`,
                state: { from: location },
            }}
        >
            <img className={img} src={src} alt={alt} />
            <p className={name}>
                {title} {date}
            </p>
            <p className={rate}>{vote}</p>
        </Link>
    );
};

MoviesListItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    vote: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default withRouter(MoviesListItem);
