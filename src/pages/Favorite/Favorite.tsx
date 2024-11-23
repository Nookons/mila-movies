import React from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import MoviesDisplay from "../../components/MoviesDisplay";

const Favorite = () => {
    const {favorite_movie, loading, error} = useAppSelector(state => state.favorite_movies)

    return (
        <MoviesDisplay
            title={`This is you're favorite movies [${favorite_movie.length}]`}
            array={favorite_movie}
            loading={loading}
            error={error}
        />
    )
};

export default Favorite;