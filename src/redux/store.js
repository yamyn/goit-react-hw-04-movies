import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import moviesListReducer from './movieList/movieListReducer';
// import alertReducer from './alert/alertReducer';

// import validation from './middleware/validation';

const rootReducer = combineReducers({
    moviesList: moviesListReducer,
});

const middleware = [ReduxThunk];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);

export default store;
