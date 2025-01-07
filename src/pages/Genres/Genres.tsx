import React, { useEffect, useState } from 'react';
import { TMBD_Options } from "../../utils/TMBDOptions";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/storeHooks";

const Genres = () => {
    const [searchParams] = useSearchParams();
    const language = useAppSelector(state => state.language.language);
    const genre_id = searchParams.get('genre_id');
    const [movies, setMovies] = useState([]);

    async function getMoviesByGenre(genre_id: string) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMBD_Options.headers.Authorization}&with_genres=${genre_id}`, TMBD_Options);
            if (!response.ok) {
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json();
            setMovies(data.results);  // Сохраняем данные о фильмах в состояние
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMoviesByGenre("28") // Пример для жанра Action (ID = 28)
    }, [TMBD_Options]);

    return (
        <div style={{padding:'2rem', height: '65dvh'}}>
            <h4>Movies by Genre {genre_id}</h4>
        </div>
    );
};

export default Genres;
