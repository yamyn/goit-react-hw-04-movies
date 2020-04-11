import React, { Component } from 'react';
import Movie from '../components/SingleMovie/SingleMovie';
import moviesApi from '../services/apiService';

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

        history.push('/movies');
    };

    render() {
        console.log(this.state);
        const { movie } = this.state;

        return <Movie {...movie} />;
    }
}
