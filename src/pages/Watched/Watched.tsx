import React from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import MoviesDisplay from "../../components/MoviesDisplay";

const Watched = () => {
    const {watched, loading, error} = useAppSelector(state => state.watched)

    return (
        <MoviesDisplay
            title={`This is you're want to watch movies [${watched.length}]`}
            array={watched}
            loading={loading}
            error={error}
        />
    )
};

export default Watched;