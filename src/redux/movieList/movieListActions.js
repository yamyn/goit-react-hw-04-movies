import Type from './movieListTypes';

export const fetchMoviesStart = () => ({
    type: Type.FETCH_MOVIES_START,
});

export const fetchMoviesSuccess = movies => ({
    type: Type.FETCH_MOVIES_SUCCESS,
    payload: { movies },
});

export const fetchMoviesError = error => ({
    type: Type.FETCH_MOVIES_ERROR,
    payload: { error },
});

export const resetMoviesPage = () => ({
    type: Type.RESET_MOVIES_PAGE,
});

export const updateMoviesPage = page => ({
    type: Type.UPDATE_MOVIES_PAGE,
    payload: { page },
});

export const downgradeMoviesPage = () => ({
    type: Type.DOWNGRADE_MOVIES_PAGE,
});
