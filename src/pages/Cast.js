import React, { Component } from 'react';

import moviesApi from '../services/apiService';
import CastList from '../components/CastList/CastList';
import Pagination from '../components/Pagination/Pagination';
import DescriptionWrap from '../components/DescriptionWrap/DescriptionWrap';

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

export default class CastListPage extends Component {
    state = {
        actors: {},
        page: 1,
        isNotFound: false,
    };

    componentDidMount() {
        this.setState({ page: 1 });
        const id = getIdFromProps(this.props);
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
            const pageCount = prevState.actors.pageCount;
            if (prevState.page !== pageCount) {
                return { page: prevState.page + 1 };
            }
            return;
        });
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
