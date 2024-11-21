import React from 'react';
import FavoriteDisplay from "./Favorite/FavoriteDisplay";
import PopularDisplay from "./Popular/PopularDisplay";
import SearchMovie from "./Search/SearchMovie";
import MoviesCarousel from "./MoviesCarousel";
import {useAppSelector} from "../../hooks/storeHooks";

const Home = () => {
    const {favorite_movie, loading, error} = useAppSelector(state => state.favorite_movies)

    return (
        <div>
            <MoviesCarousel
                array={favorite_movie}
                loading={loading}
                error={error}
                title={"Соңғы сүйікті ❤️‍🔥"}
            />
            <SearchMovie />
            <PopularDisplay />
        </div>
    );
};

export default Home;