import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

//Static Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

//Pages
import HomePage from '../../pages/Home';
import MoviesPage from '../../pages/Movies';
import MovieDetailsPage from '../../pages/Movie';

const AsyncHomePage = lazy(() => import('../../pages/Home'));
const App = () => (
    <>
        <Header />
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path="/" exact component={AsyncHomePage} />
                <Route path="/movies/:movieId" component={MovieDetailsPage} />
                <Route path="/movies" component={MoviesPage} />
            </Switch>
        </Suspense>
        <Footer />
    </>
);

export default App;
