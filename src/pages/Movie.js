import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

//Static Components
import Movie from '../components/SingleMovie/SingleMovie';
import ButtomBtn from '../components/BottomBtn/BottomBtn';
import Loader from '../components/Loader/Loader';

import moviesApi from '../services/apiService';

//Pages
const AsyncCastListPage = lazy(() => import('./Cast'));
const AsyncReviewsPage = lazy(() => import('./Reviews'));

const getIdFromProps = props => props.match.params.movieId;

export default class MovieDetailsPage extends Component {
    state = { movie: null };

    componentDidMount() {
        const id = getIdFromProps(this.props);

        moviesApi.getMovie(id).then(movie => this.setState({ movie }));
    }

    handleGoback = () => {
        const { history, location } = this.props;

        if (location.state) {
            return history.push(location.state.from);
        }

        history.push('/');
    };

    render() {
        const { movie } = this.state;
        const { path } = this.props.match;

        return (
            <main>
                <Movie {...movie} />
                <Suspense fallback={<Loader />}>
                    <Route
                        path={`${path}/cast`}
                        component={AsyncCastListPage}
                    />
                    <Route
                        path={`${path}/reviews`}
                        component={AsyncReviewsPage}
                    />
                </Suspense>
                <ButtomBtn
                    text={'Go To the list'}
                    onClick={this.handleGoback}
                />
            </main>
        );
    }
}
