import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Movie from '../components/SingleMovie/SingleMovie';
import ButtomBtn from '../components/BottomBtn/BottomBtn';

import moviesApi from '../services/apiService';
import CastListPage from './Cast';
import ReviewsPage from './Reviews';

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
                <Route path={`${path}/cast`} component={CastListPage} />
                <Route path={`${path}/reviews`} component={ReviewsPage} />
                <ButtomBtn
                    text={'Go To the list'}
                    onClick={this.handleGoback}
                />
            </main>
        );
    }
}
