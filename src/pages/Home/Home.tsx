import React from 'react';
import SearchMovie from "./Search/SearchMovie";
import {useAppSelector} from "../../hooks/storeHooks";
import Button from "antd/es/button";
import {Space} from "antd";
import MoviesSlider from "./MovieSlider/MoviesSlider";
import PopularDisplay from "./Popular/PopularDisplay";

const Home = () => {
    const {watch_later, loading, error} = useAppSelector(state => state.watch_later)
    const {favorite_movie} = useAppSelector(state => state.favorite_movies)

    return (
        <div style={{padding: 14}}>
            <Space>
                <Button>Favy</Button>
                <Button>Watch later</Button>
            </Space>
            <MoviesSlider
                array={watch_later}
                loading={loading}
                error={error}
                title={"Соңғы сүйікті ❤️‍🔥"}
            />
            <MoviesSlider
                loading={loading}
                array={favorite_movie}
                title={"Соңғы сүйікті ❤️‍🔥"}
            />
            <SearchMovie/>
            <PopularDisplay/>
        </div>
    );
};

export default Home;