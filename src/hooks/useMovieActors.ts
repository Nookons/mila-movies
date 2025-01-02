import { useState, useEffect } from 'react';
import {TMBD_Options} from "../utils/TMBDOptions";
import {IActor, IMovieCreditsResponse} from "../type/Actors";
import {useAppSelector} from "./storeHooks";


const useMovieActors = (movieId: string) => {
    const language = useAppSelector(state => state.language.language);
    const [actors, setActors] = useState<IActor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=${language}-${language.toUpperCase()}`, TMBD_Options);

                if (!response.ok) {
                    throw new Error('Failed to fetch actors');
                }

                const data: IMovieCreditsResponse = await response.json();
                setActors(data.cast);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchActors();
    }, [movieId]);

    return { actors, loading, error };
};

export default useMovieActors;
