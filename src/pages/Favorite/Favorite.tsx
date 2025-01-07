import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/storeHooks";
import {Divider} from "antd";
import dayjs from "dayjs";

const Favorite = () => {
    const [searchParams] = useSearchParams();
    const language = useAppSelector(state => state.language.language);
    const uid = searchParams.get('uid');

    const {favorite_movies, loading, error} = useAppSelector(state => state.favorite_movies);


    if (!favorite_movies) return null;

    return (
        <div>
            <h5>Last updated: {dayjs(favorite_movies.update_date).format("dddd, MM-DD [at] HH:mm")}</h5>
            {favorite_movies.list.map(movie => {

                return (
                    <Divider>{movie}</Divider>
                )
            })}
        </div>
    );
};

export default Favorite;