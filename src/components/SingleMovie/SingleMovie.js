import React from 'react';
import {
    main,
    poster,
    section,
    sectionTitle,
    table,
    col1,
    about,
    description,
} from './SingleMovie.module.css';

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
}) => (
    <main className={`${main} container`}>
        <img className={poster} src={imageURL} alt={originalTitle} />
        <section className={section}>
            <h2 className={sectionTitle}>
                {title} {date}
            </h2>
            <table className={table}>
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
            </table>
            <h2 className={about}>About</h2>
            <p className={description}>{overview}</p>
        </section>
    </main>
);

export default Movie;
