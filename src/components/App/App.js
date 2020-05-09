import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

//Static Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

//Pages
const AsyncHomePage = lazy(() => import('../../pages/Home'));
const AsyncMoviesPage = lazy(() => import('../../pages/Movies'));
const AsyncDetailsPage = lazy(() => import('../../pages/Movie'));

const App = () => (
    <>
        <Header />
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path="/" exact component={AsyncHomePage} />
                <Route path="/movies/:movieId" component={AsyncDetailsPage} />
                <Route path="/movies" component={AsyncMoviesPage} />
            </Switch>
        </Suspense>
        <Footer />
    </>
);

export default App;
