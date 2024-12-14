import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {IMovie, IMovieFull} from "../../type/Movie";
import {Alert, Col, Descriptions, Divider, FloatButton, message, Row, Skeleton, Space, Tag} from "antd";
import Trailer from "./dep/Trailer";
import MovieDescriptions from './dep/MovieDescriptions';
import MovieButtons from "./dep/MovieButtons";
import SimilarMovies from "./dep/SimilarMovies";
import useMovieDataFull from "../../hooks/useFetchMovieFull";
import MovieActors from "./dep/MovieActors";

const Single = () => {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');


    const {currentMovie, loading, error} = useMovieDataFull(movie_id ? movie_id : "")



    if (loading) {
        return (
            <div style={{padding: 14}}>
                <Skeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div style={{padding: 14}}>
                <Alert
                    message="Error"
                    description="This is an error message about movie fetching."
                    type="error"
                    showIcon
                />
            </div>
        )
    }

    if (!currentMovie) {
        return <Skeleton/>
    }

    return (
        <Row style={{padding: 14, maxWidth: 1200, margin: "0 auto"}} gutter={[24, 4]}>
            <Col xs={24} md={10} xl={8}>
                <div  style={{position: "relative"}}>
                    <img style={{maxWidth: "100%", position: "relative"}}
                         src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                    />
                    <MovieButtons current_movie={currentMovie}/>
                </div>
            </Col>
            <Col xs={24} md={14} xl={16}>
                <MovieDescriptions current_movie={currentMovie}/>
            </Col>

            {/* <SimilarMovies movie_id={current_movie.id} />
            <Divider dashed/>*/}

            <Col span={24}>
                {movie_id && <Trailer movie_id={movie_id}/>}
            </Col>
        </Row>
    );
};

export default Single;