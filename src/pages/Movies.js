import React, { Component } from 'react';

import moviesApi from '../services/apiService';

import MoviesList from '../components/MoviesList/MoviesList';
import Pagination from '../components/Pagination/Pagination';
import Searchbar from '../components/Searchbar/Searchbar';
import Main from '../components/Main/Main';
import Notification from '../components/Notification/Notification';

export default class MoviesPage extends Component {
    state = {
        movies: [],
        isLoading: false,
        isNotFound: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (moviesApi.currentPage > 1) {
            window.scrollTo({
                top: 240,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = query => {
        if (query) {
            moviesApi.resetPage();
            moviesApi.query = query;
        }
        moviesApi
            .getSearchedMovie()
            .then(res => {
                if (res.length === 0) {
                    this.setState({ isNotFound: true });

                    return;
                }

                if (res.length === 1) {
                    const { history } = this.props;
                    const id = res[0].id;
                    history.push(`/movies/${id}`);
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
            <>
                <Searchbar onSubmit={this.fetchMovies} />
                {movies.length > 0 && (
                    <Main message={`Movies for "${moviesApi.query}"`}>
                        {isNotFound ? (
                            <Notification message="Movies for your query not found" />
                        ) : (
                            <>
                                <MoviesList movies={movies} />
                                <Pagination
                                    onClickPrev={this.getPrevPage}
                                    onClickNext={this.getNextPage}
                                    page={page}
                                />
                            </>
                        )}
                    </Main>
                )}
            </>
        );
    }
}
