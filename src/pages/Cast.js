import React, { Component } from 'react';
import queryString from 'query-string';

import moviesApi from '../services/apiService';
import generateActorsObj from '../helpers/generateActorsObj';

import CastList from '../components/CastList/CastList';
import Pagination from '../components/Pagination/Pagination';
import DescriptionWrap from '../components/DescriptionWrap/DescriptionWrap';

const getIdFromProps = props => props.match.params.movieId;
const getPageFromProps = props => queryString.parse(props.location.search).page;

export default class CastListPage extends Component {
    state = {
        actors: {},
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
        moviesApi.getCastList(id).then(res => {
            if (res.length === 0) {
                this.setState({ isNotFound: true });

                return;
            }
            const actorsObj = generateActorsObj(res);

            this.setState({
                actors: actorsObj,
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
        const pageCount = this.state.actors.pageCount;
        const newPage = oldPage ? Number(oldPage) + 1 : 2;
        if (newPage !== pageCount) this.urlUpdate(newPage);
    };

    render() {
        const { actors, page } = this.state;
        const actorsList = actors[page];

        return (
            <>
                {actorsList && (
                    <DescriptionWrap
                        message={`Series Cast (${actors.length} actors)`}
                    >
                        <CastList actors={actorsList} />
                        <Pagination
                            onClickPrev={this.getPrevPage}
                            onClickNext={this.getNextPage}
                            page={page}
                        />
                    </DescriptionWrap>
                )}
            </>
        );
    }
}
