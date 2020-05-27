import {
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesError,
} from './movieListActions';
import moviesApi from '../../services/apiService';
import listMoviesMapper from '../../helpers/listMoviesMapper';

export const fetchMovies = query => dispatch => {
    dispatch(fetchMoviesStart());
    try {
        if (query) {
            moviesApi.query = query;

            moviesApi.getSearchedMovie().then(data => {
                const transformData = listMoviesMapper(data);
                dispatch(fetchMoviesSuccess(transformData));
            });
        }

        moviesApi.getPopularMovies().then(data => {
            const transformData = listMoviesMapper(data);
            dispatch(fetchMoviesSuccess(transformData));
        });
    } catch (error) {
        dispatch(fetchMoviesError(error));
    }
};

export const deletePost = id => dispatch => {
    console.log(id, dispatch);
};
