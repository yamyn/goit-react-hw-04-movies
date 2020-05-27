import React, { Component } from 'react';
import queryString from 'query-string';
import moviesApi from '../../services/apiService';
import listMoviesMapper from '../../helpers/listMoviesMapper';

import MoviesList from '../../components/MoviesList/MoviesList';
import Pagination from '../../components/Pagination/Pagination';
import Searchbar from '../../components/Searchbar/Searchbar';
import Main from '../../components/Main/Main';
import Notification from '../../components/Notification/Notification';

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
        const { updatePage, fetchMovies } = this.props;
        const query = getQueryFromProps(this.props);
        if (query) {
            const page = getPageFromProps(this.props);

            if (page) updatePage(page);
            fetchMovies(query);
        }
    }

    componentDidUpdate(prevProps) {
        const { updatePage, fetchMovies, page } = this.props;
        const prevQuery = getQueryFromProps(prevProps);
        const nextQuery = getQueryFromProps(this.props);

        if (prevQuery !== nextQuery) {
            fetchMovies(nextQuery);
        }

        const prevPage = getPageFromProps(prevProps);
        const nextPage = getPageFromProps(this.props);

        if (prevPage !== nextPage) {
            updatePage(nextPage);
            fetchMovies();
        }

        if (page > 1) {
            window.scrollTo({
                top: 240,
                behavior: 'smooth',
            });
        }
    }

    // fetchMovies = query => {
    //     if (query) {
    //         moviesApi.query = query;
    //     }
    //     moviesApi
    //         .getSearchedMovie()
    //         .then(data => {
    //             if (data.results.length === 0) {
    //                 this.setState({ isNotFound: true });

    //                 return;
    //             }

    //             if (data.results.length === 1) {
    //                 const { history } = this.props;
    //                 const { id } = data.results[0];
    //                 history.push(`/movies/${id}`);
    //             }

    //             const transformData = listMoviesMapper(data);
    //             this.setState(state => ({
    //                 movies: [...transformData],
    //                 isNotFound: false,
    //             }));
    //         })
    //         .finally(() => {
    //             this.setState({ isLoading: false });
    //         });
    // };

    urlUpdate = (searchQuery, newPage) => {
        const { page } = this.props;
        if (searchQuery) moviesApi.resetPage();
        const currentQuery = searchQuery
            ? searchQuery.toLowerCase()
            : moviesApi.query;
        const nextPage = newPage || page;
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `query=${currentQuery}&page=${nextPage}`,
        });
    };

    getPrevPage = () => {
        const { page } = this.props;
        const newPage = page - 1;
        if (newPage) return this.urlUpdate('', newPage);
        this.urlUpdate('', 1);
    };

    getNextPage = () => {
        const { page } = this.props;
        const newPage = page + 1;
        this.urlUpdate('', newPage);
    };

    render() {
        const { isNotFound } = this.state;
        const { page, movies } = this.props;
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
