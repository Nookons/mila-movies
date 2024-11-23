import React from 'react';
import {Tabs} from "antd";
import MoviesSlider from "./MovieSlider/MoviesSlider";
import SearchMovie from "./Search/SearchMovie";
import PopularDisplay from "./Popular/PopularDisplay";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/storeHooks";

const HomeChild = () => {
    const navigate = useNavigate();
    const {watch_later, loading, error} = useAppSelector(state => state.watch_later)
    const {favorite_movie} = useAppSelector(state => state.favorite_movies)
    const {watched} = useAppSelector(state => state.watched)

    return (
        <div>
            <MoviesSlider
                array={watch_later}
                loading={loading}
                error={error}
                title={"Watch later ❤️‍"}
            />
            <SearchMovie/>
            <PopularDisplay/>
        </div>
    );
};

export default HomeChild;