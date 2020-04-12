import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import moviesApi from '../../services/apiService';
import mapper from '../../helpers/mapper';

import styles from './App.module.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//Pages
import HomePage from '../../pages/Home';
import MoviesPage from '../../pages/Movies';
import MovieDetailsPage from '../../pages/Movie';

import MoviesList from '../MoviesList/MoviesList';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import Notification from '../Notification/Notification';
import Main from '../Main/Main';

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
        moviesApi.downgradePage();
        this.fetchMovies();
    };

    getNextPage = () => {
        moviesApi.updatePage();
        this.fetchMovies();
    };

    goOnHome = event => {
        event.preventDefault();
        moviesApi.query = '';
        moviesApi.resetPage();
        this.fetchMovies();
    };

    render() {
        const { movies, isLoading, isNotFound } = this.state;
        const page = moviesApi.currentPage;
        return (
            <>
                <Header onClick={this.goOnHome} />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route
                        path="/movies/:movieId"
                        component={MovieDetailsPage}
                    />
                    <Route path="/movies" component={MoviesPage} />
                    {/* <Main message="Popular movies">
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
                    </Main> */}
                </Switch>
                <Footer />
            </>
        );
    }
}
