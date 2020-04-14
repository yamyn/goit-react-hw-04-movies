import React, { Component } from 'react';

import moviesApi from '../services/apiService';
import listMoviesMapper from '../helpers/listMoviesMapper';

import MoviesList from '../components/MoviesList/MoviesList';
import Pagination from '../components/Pagination/Pagination';
import Main from '../components/Main/Main';

export default class HomePage extends Component {
    state = {
        movies: [],
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
        moviesApi.getPopularMovies().then(data => {
            const transformData = listMoviesMapper(data);
            this.setState(state => ({
                movies: [...transformData],
            }));
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
        const { movies } = this.state;
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
