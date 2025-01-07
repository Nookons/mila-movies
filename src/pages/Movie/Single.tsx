import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Row, Skeleton, message } from "antd";
import Trailer from "./dep/Trailer";
import MovieDescriptions from './dep/MovieDescriptions';
import { IMovieFull } from "../../type/Movie";
import { useAppSelector } from "../../hooks/storeHooks";
import {TMBD_Options} from "../../utils/TMBDOptions";

const Single = () => {
    const [searchParams] = useSearchParams();
    const language = useAppSelector(state => state.language.language);
    const movie_id = searchParams.get('id');

    const [current_movie, setCurrent_movie] = useState<IMovieFull | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getFullMovie() {
            try {
                setIsLoading(true)
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=${language}-${language.toUpperCase()}`, TMBD_Options);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie data');
                }
                const data = await response.json();
                setCurrent_movie(data);
            } catch (err) {
                err && setError(err.toString);
            } finally {
                setIsLoading(false);
            }
        }
        getFullMovie();
    }, [language, movie_id]);


    if (isLoading) {
        return (
            <div style={{ padding: 14 }}>
                <Skeleton active />
            </div>
        );
    }

    if (error) {
        return <Alert message={error} type="error" showIcon />;
    }

    if (!current_movie) {
        return <Skeleton active />;
    }

    return (
        <Row style={{maxWidth: 1200, margin: "0 auto" }}>
            <Col xs={24} md={10} xl={8}>
                <div style={{ position: "relative" }}>
                    <img
                        style={{ maxWidth: "100%", position: "relative" }}
                        src={`https://image.tmdb.org/t/p/w500${current_movie.poster_path}`}
                        alt={current_movie.title}
                    />
                </div>
            </Col>
            <Col style={{padding: "14px 14px"}} xs={24} md={14} xl={16}>
                <MovieDescriptions current_movie={current_movie} />
            </Col>

            <Col style={{padding: "14px 14px"}} span={24}>
                {movie_id && <Trailer movie_id={movie_id} />}
            </Col>
        </Row>
    );
};

export default Single;
