import { connect } from 'react-redux';

import { fetchMovies } from '../../redux/movieList/movieListOperations';
import * as moviesActions from '../../redux/movieList/movieListActions';
import {
    getMovies,
    getMoviesPage,
} from '../../redux/movieList/movieListSelectors';

import Movies from './Movies';

const mapStateToProps = state => ({
    movies: getMovies(state),
    page: getMoviesPage(state),
});

const mapDispatchToProps = dispatch => ({
    fetchMovies: query => dispatch(fetchMovies(query)),
    resetPage: () => dispatch(moviesActions.resetMoviesPage()),
    updatePage: () => dispatch(moviesActions.updateMoviesPage()),
    downgradePage: () => dispatch(moviesActions.downgradeMoviesPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
