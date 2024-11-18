import React from 'react';
import FavoriteDisplay from "./Favorite/FavoriteDisplay";
import PopularDisplay from "./Popular/PopularDisplay";
import SearchMovie from "./Search/SearchMovie";

const Home = () => {


    return (
        <div>
            <FavoriteDisplay />
            <SearchMovie />
            <PopularDisplay />
        </div>
    );
};

export default Home;