import { combineReducers } from 'redux';

import moviesApi from '../../services/apiService';
import Type from './movieListTypes';

const MoviesItemsReducer = (state = [], action) => {
    switch (action.type) {
        case Type.FETCH_MOVIES_SUCCESS:
            return action.payload.movies;

        default:
            return state;
    }
};

const MoviesPageReducer = (state = 1, action) => {
    switch (action.type) {
        case Type.RESET_MOVIES_PAGE:
            moviesApi.resetPage();
            return moviesApi.currentPage;

        case Type.UPDATE_MOVIES_PAGE:
            if (action.payload.page) {
                moviesApi.currentPage = action.payload.page;
            } else {
                moviesApi.updatePage();
            }

            return moviesApi.currentPage;

        case Type.DOWNGRADE_MOVIES_PAGE:
            moviesApi.downgradePage();
            return moviesApi.currentPage;

        default:
            return state;
    }
};

const MoviesReducer = combineReducers({
    items: MoviesItemsReducer,
    page: MoviesPageReducer,
});

const MoviesListReducer = combineReducers({
    movies: MoviesReducer,
});

export default MoviesListReducer;
