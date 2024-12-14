import { useState, useEffect } from 'react';
import {IMovieFull} from "../type/Movie";

const useMovieDataFull = (movie_id: string) => {
    const [currentMovie, setCurrentMovie] = useState<IMovieFull | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (movie_id) {
            const fetchMovie = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTczMTkxNDgxNS43MjM4MzY0LCJzdWIiOiI2NGQ1NzkzN2QxMDBiNjAwYWRhMDAyNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBArssuyWKerLl2OEN_2qM6ITzltfuHDHJjiYQ3ZlOY'
                    }
                };

                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=ru-RU`, options);
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie data');
                    }
                    const data = await response.json();
                    setCurrentMovie(data);
                } catch (err) {
                    err && setError(err.toString);
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }
    }, [movie_id]);
    return { currentMovie, loading, error };
};

export default useMovieDataFull;
