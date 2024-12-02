import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {IMovie, IMovieFull} from "../../type/Movie";
import {Col, Descriptions, Divider, FloatButton, message, Row, Skeleton, Space, Tag} from "antd";
import Trailer from "./Trailer";
import MovieDescriptions from './MovieDescriptions';
import MovieButtons from "./MovieButtons";

const Single = () => {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');

    const [current_movie, setCurrent_movie] = useState<IMovieFull | null>(null);


    useEffect(() => {
        if (movie_id) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTczMTkxNDgxNS43MjM4MzY0LCJzdWIiOiI2NGQ1NzkzN2QxMDBiNjAwYWRhMDAyNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBArssuyWKerLl2OEN_2qM6ITzltfuHDHJjiYQ3ZlOY'
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=ru-RU`, options)
                .then(res => res.json())
                .then(res => setCurrent_movie(res))
                .catch(err => console.error(err));
        }
    }, []);



    if (!current_movie) {
        return <Skeleton/>
    }



    return (
        <Row style={{margin: "14px 0", padding: 14}} gutter={[16, 16]}>
            <Col span={24}>
                <img style={{maxWidth: "100%", position: "relative"}}
                     src={`https://image.tmdb.org/t/p/w500${current_movie.poster_path}`}
                />
                <MovieButtons current_movie={current_movie} />
            </Col>

            <MovieDescriptions current_movie={current_movie} />

            <Col span={24}>
                {movie_id && <Trailer movie_id={movie_id}/>}
            </Col>
        </Row>
    );
};

export default Single;