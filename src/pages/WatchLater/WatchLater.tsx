import React from 'react';
import MoviesDisplay from "../../components/MoviesDisplay";
import {useAppSelector} from "../../hooks/storeHooks";

const WatchLater = () => {
    const {watch_later, loading, error} = useAppSelector(state => state.watch_later)

    return (
        <MoviesDisplay
            title={`This is you're want to watch movies [${watch_later.length}]`}
            array={watch_later}
            loading={loading}
            error={error}
        />
    )
};

export default WatchLater;