import React, { Component } from 'react';

import moviesApi from '../services/apiService';

import MoviesList from '../components/MoviesList/MoviesList';
import Pagination from '../components/Pagination/Pagination';
import Main from '../components/Main/Main';

export default class HomePage extends Component {
    state = {
        movies: [],
        isLoading: false,
        isNotFound: false,
    };

    componentDidMount() {
        moviesApi.resetPage();
        this.fetchMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (moviesApi.currentPage > 1) {
            window.scrollTo({
                top: 184,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = () => {
        moviesApi
            .getPopularMovies()
            .then(res => {
                if (res.length === 0) {
                    this.setState({ isNotFound: true });

                    return;
                }
                this.setState(state => ({
                    movies: [...res],
                    isNotFound: false,
                }));
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    getPrevPage = () => {
        moviesApi.downgradePage();
        this.fetchMovies();
    };

    getNextPage = () => {
        moviesApi.updatePage();
        this.fetchMovies();
    };

    render() {
        const { movies, isLoading, isNotFound } = this.state;
        const page = moviesApi.currentPage;
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
