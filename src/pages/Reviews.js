import React, { Component } from 'react';

import moviesApi from '../services/apiService';
import Review from '../components/Review/Review';
import Pagination from '../components/Pagination/Pagination';
import DescriptionWrap from '../components/DescriptionWrap/DescriptionWrap';
import Notification from '../components/Notification/Notification';

const getIdFromProps = props => props.match.params.movieId;
const generateActorsObj = arr => {
    const actorsObj = {};
    arr.reduce((acc, obj, i) => {
        if (!(i % 5)) {
            acc += 1;
            actorsObj[`${acc}`] = [];
            actorsObj.pageCount = acc;
            actorsObj.length = arr.length;
        }
        actorsObj[`${acc}`].push(obj);
        return acc;
    }, 0);
    return actorsObj;
};

export default class ReviewsPage extends Component {
    state = {
        reviews: [],
        page: 1,
        isNotFound: false,
    };

    componentDidMount() {
        this.setState({ page: 1 });
        const id = getIdFromProps(this.props);
        console.log(id);
        this.fetchMovies(id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page === 1 && prevState.page !== 2) {
            window.scrollTo({
                top: 550,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = id => {
        moviesApi.getReviews(id).then(res => {
            if (res.length === 0) {
                this.setState({ isNotFound: true });

                return;
            }
            console.log(res);
            this.setState({
                reviews: res,
                isNotFound: false,
            });
        });
    };

    getPrevPage = () => {
        this.setState(prevState => {
            if (prevState.page > 1) {
                return { page: prevState.page - 1 };
            }
            return;
        });
    };

    getNextPage = () => {
        this.setState(prevState => {
            const pageCount = prevState.reviews.length;
            if (prevState.page !== pageCount) {
                return { page: prevState.page + 1 };
            }
            return;
        });
    };

    render() {
        const { reviews, page } = this.state;
        const review = reviews[page - 1];

        return (
            <>
                {reviews.length > 0 ? (
                    <DescriptionWrap message={`Written by @${review.author}`}>
                        <Review info={review.content} />
                        <Pagination
                            onClickPrev={this.getPrevPage}
                            onClickNext={this.getNextPage}
                            page={page}
                        />
                    </DescriptionWrap>
                ) : (
                    <DescriptionWrap message="Woooooops!">
                        <Notification message="There are no reviews for this movie" />
                    </DescriptionWrap>
                )}
            </>
        );
    }
}
