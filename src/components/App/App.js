import React, { Component } from 'react';

import moviesApi from '../../services/apiService';
import mapper from '../../helpers/mapper';

import styles from './App.module.css';

import MoviesList from '../MoviesList/MoviesList';
import Header from '../Header/Header';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import Notification from '../Notification/Notification';
import apiService from '../../services/apiService';

export default class App extends Component {
    state = {
        movies: [],
        isLoading: false,
        isNotFound: false,
    };

    componentDidMount() {
        this.fetchMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (apiService.currentPage > 1) {
            window.scrollTo({
                top: 240,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = query => {
        if (query) {
            moviesApi.resetPage();
            moviesApi._query = query;
        }
        moviesApi
            .getSearchedMovie()
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
        apiService.downgradePage();
        this.fetchMovies();
    };

    getNextPage = () => {
        apiService.updatePage();
        this.fetchMovies();
    };

    goOnHome = event => {
        event.preventDefault();
        apiService._query = '';
        apiService.resetPage();
        this.fetchMovies();
    };

    render() {
        const { movies, isLoading, isNotFound } = this.state;
        const page = apiService.currentPage;
        return (
            <div>
                <Header onClick={this.goOnHome} />
                <Searchbar onSubmit={this.fetchMovies} />
                <main className={`container ${styles.main}`}>
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
                </main>
            </div>
        );
    }
}
