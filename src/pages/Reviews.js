import React, { Component } from 'react';
import queryString from 'query-string';

import moviesApi from '../services/apiService';
import reviewListMapper from '../helpers/reviewListMapper';

import Review from '../components/Review/Review';
import Pagination from '../components/Pagination/Pagination';
import DescriptionWrap from '../components/DescriptionWrap/DescriptionWrap';
import Notification from '../components/Notification/Notification';

const getIdFromProps = props => props.match.params.movieId;
const getPageFromProps = props => queryString.parse(props.location.search).page;

export default class ReviewsPage extends Component {
    state = {
        reviews: [],
        page: 1,
        isNotFound: false,
    };

    componentDidMount() {
        const id = getIdFromProps(this.props);
        const page = getPageFromProps(this.props);
        if (page) {
            this.setState({
                page: Number(page),
            });
        }

        this.fetchMovies(id);
    }

    componentDidUpdate(prevProps, prevState) {
        const prevPage = getPageFromProps(prevProps);
        const nextPage = getPageFromProps(this.props);

        if (prevPage !== nextPage) {
            this.setState({
                page: Number(nextPage),
            });
        }

        if (this.state.page === 1 && prevState.page !== 2) {
            window.scrollTo({
                top: 550,
                behavior: 'smooth',
            });
        }
    }

    fetchMovies = id => {
        moviesApi.getReviews(id).then(data => {
            if (data.results.length === 0) {
                this.setState({ isNotFound: true });

                return;
            }

            const transformData = reviewListMapper(data);
            this.setState({
                reviews: transformData,
                isNotFound: false,
            });
        });
    };

    urlUpdate = newPage => {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `page=${newPage}`,
        });
    };

    getPrevPage = () => {
        const oldpage = getPageFromProps(this.props);
        const newPage = Number(oldpage) - 1;
        if (oldpage > 1) this.urlUpdate(newPage);
    };

    getNextPage = () => {
        const oldPage = getPageFromProps(this.props);
        const pageCount = this.state.reviews.length + 1;
        const newPage = oldPage ? Number(oldPage) + 1 : 2;
        if (newPage !== pageCount) this.urlUpdate(newPage);
    };

    render() {
        const { reviews, page } = this.state;
        const review = reviews[page - 1];
        console.log(reviews);
        return (
            <>
                {reviews.length > 0 ? (
                    <DescriptionWrap message={`Written by @${review.author}`}>
                        <Review info={review.content} />
                        {reviews.length !== 1 ? (
                            <Pagination
                                onClickPrev={this.getPrevPage}
                                onClickNext={this.getNextPage}
                                page={page}
                            />
                        ) : (
                            <Notification message="Only one reviews for this movie" />
                        )}
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
