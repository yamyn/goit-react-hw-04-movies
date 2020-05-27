import React, { Component } from 'react';

import MoviesList from '../../components/MoviesList/MoviesList';
import Pagination from '../../components/Pagination/Pagination';
import Main from '../../components/Main/Main';

export default class HomePage extends Component {
    componentDidMount() {
        const { resetPage, fetchMovies } = this.props;
        resetPage();
        fetchMovies();
    }

    componentDidUpdate() {
        const { page } = this.props;
        if (page > 1) {
            window.scrollTo({
                top: 184,
                behavior: 'smooth',
            });
        }
    }

    getPrevPage = () => {
        const { downgradePage, fetchMovies } = this.props;
        downgradePage();
        fetchMovies();
    };

    getNextPage = () => {
        const { updatePage, fetchMovies } = this.props;
        updatePage();
        fetchMovies();
    };

    render() {
        const { movies, page } = this.props;

        return (
            <Main message="Popular movies">
                <MoviesList movies={movies} />
                <Pagination
                    onClickPrev={this.getPrevPage}
                    onClickNext={this.getNextPage}
                    page={page}
                />
            </Main>
        );
    }
}
