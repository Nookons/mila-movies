import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {subscribeToFavoriteMovies} from "./store/reducers/favoriteMovies";
import {useAppDispatch} from "./hooks/storeHooks";
import {subscribeToWatchLater} from "./store/reducers/watchLater";
import {subscribeToWatched} from "./store/reducers/watched";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(subscribeToFavoriteMovies());
        dispatch(subscribeToWatchLater());
        dispatch(subscribeToWatched());
    }, [dispatch]);

    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
        </>
    );
};

export default App;