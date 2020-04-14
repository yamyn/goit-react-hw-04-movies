import React, { Component } from 'react';
import queryString from 'query-string';
import moviesApi from '../services/apiService';
import listMoviesMapper from '../helpers/listMoviesMapper';

import MoviesList from '../components/MoviesList/MoviesList';
import Pagination from '../components/Pagination/Pagination';
import Searchbar from '../components/Searchbar/Searchbar';
import Main from '../components/Main/Main';
import Notification from '../components/Notification/Notification';

const getQueryFromProps = props =>
    queryString.parse(props.location.search).query;

const getPageFromProps = props => queryString.parse(props.location.search).page;

export default class MoviesPage extends Component {
    state = {
        movies: [],
        isLoading: false,
        isNotFound: false,
    };

    componentDidMount() {
        const query = getQueryFromProps(this.props);
        if (query) {
            const page = getPageFromProps(this.props);

            if (page) moviesApi.currentPage = Number(page);
            this.fetchMovies(query);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = getQueryFromProps(prevProps);
        const nextQuery = getQueryFromProps(this.props);

        if (prevQuery !== nextQuery) {
            this.fetchMovies(nextQuery);
        }

        const prevPage = getPageFromProps(prevProps);
        const nextPage = getPageFromProps(this.props);

        if (prevPage !== nextPage) {
            moviesApi.currentPage = Number(nextPage);
            this.fetchMovies();
        }

        if (moviesApi.currentPage > 1) {
            window.scrollTo({
                top: 240,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = query => {
        if (query) {
            moviesApi.query = query;
        }
        moviesApi
            .getSearchedMovie()
            .then(data => {
                if (data.results.length === 0) {
                    this.setState({ isNotFound: true });

                    return;
                }

                if (data.results.length === 1) {
                    const { history } = this.props;
                    const id = data.results[0].id;
                    history.push(`/movies/${id}`);
                }

                const transformData = listMoviesMapper(data);
                this.setState(state => ({
                    movies: [...transformData],
                    isNotFound: false,
                }));
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    urlUpdate = (searchQuery, newPage) => {
        if (searchQuery) moviesApi.resetPage();
        const currentQuery = searchQuery
            ? searchQuery.toLowerCase()
            : moviesApi.query;
        const page = newPage ? newPage : moviesApi.currentPage;
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `query=${currentQuery}&page=${page}`,
        });
    };

    getPrevPage = () => {
        const page = moviesApi.currentPage - 1;
        if (page) return this.urlUpdate('', page);
        this.urlUpdate('', 1);
    };

    getNextPage = () => {
        const page = moviesApi.currentPage + 1;
        this.urlUpdate('', page);
    };

    render() {
        const { movies, isNotFound } = this.state;
        const page = moviesApi.currentPage;
        return (
            <>
                <Searchbar onSubmit={this.urlUpdate} />
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
