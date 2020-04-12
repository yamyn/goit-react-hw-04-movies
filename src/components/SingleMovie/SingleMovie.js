import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
    main,
    poster,
    section,
    sectionTitle,
    table,
    col1,
    about,
    description,
    btn,
    btnWrap,
    reviews,
} from './SingleMovie.module.css';

const ativeStyle = {
    color: '#275c69',
};

const Movie = ({
    title,
    date,
    vote,
    votes,
    popularity,
    genres,
    overview,
    imageURL,
    originalTitle,
    match,
}) => (
    <div className={`${main} container`}>
        <img className={poster} src={imageURL} alt={originalTitle} />
        <section className={section}>
            <h2 className={sectionTitle}>
                {title} {date}
            </h2>
            <table className={table}>
                <thead></thead>
                <tbody>
                    <tr>
                        <td className={col1}>vote/votes</td>
                        <td>
                            {vote}/{votes}
                        </td>
                    </tr>
                    <tr>
                        <td className={col1}>popularity</td>
                        <td>{popularity}</td>
                    </tr>
                    <tr>
                        <td className={col1}>original title</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td className={col1} valign="top">
                            genre
                        </td>
                        <td>{genres}</td>
                    </tr>
                </tbody>
            </table>
            <h2 className={about}>About</h2>
            <p className={description}>{overview}</p>
            <div className={btnWrap}>
                <NavLink
                    to={`${match.url}/cast`}
                    exact
                    activeStyle={ativeStyle}
                    className={btn}
                >
                    Cast
                </NavLink>
                <NavLink
                    to={`${match.url}/reviews`}
                    exact
                    activeStyle={ativeStyle}
                    className={`${btn} ${reviews}`}
                >
                    Reviews
                </NavLink>
            </div>
        </section>
    </div>
);

export default withRouter(Movie);
