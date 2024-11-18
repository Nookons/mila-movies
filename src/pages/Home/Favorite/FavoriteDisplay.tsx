import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../../../hooks/storeHooks";
import {Alert, Col, Divider, Row, Skeleton} from "antd";
import { SINGLE_MOVIE } from "../../../utils/const";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../../type/Movie";

const FavoriteDisplay = () => {
    const navigate = useNavigate();
    const { favorite_movie, loading, error } = useAppSelector(state => state.favorite_movies);

    const [reversed, setReversed] = useState<IMovie[]>([]);

    useEffect(() => {
        if (favorite_movie.length) {
            const result = favorite_movie.slice().reverse();
            setReversed(result);
        }
    }, [favorite_movie]);

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <Alert style={{ margin: "14px 0" }} type="error" message="Can't load your favorite list, sorry 🥲" banner />;
    }

    if (!favorite_movie.length) {
        return <Alert style={{ margin: "14px 0" }} message={<span>Сізде әлі сүйікті фильмдер жоқ 😅</span>} type="info" closeText="Жабу" />;
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Divider>Соңғы сүйікті ❤️‍🔥</Divider>
            </Col>
            {reversed.slice(0, 4).map((movie, index) => (
                <Col
                    xs={6}      // На очень маленьких экранах (мобильных)
                    sm={6}      // На небольших экранах (планшеты)
                    md={6}       // На средних экранах (ноутбуки)
                    lg={2}       // На больших экранах (десктопы)
                    xl={2}
                    key={movie.id || index}>
                    <img
                        onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                        style={{ maxWidth: "100%", borderRadius: 6}}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default FavoriteDisplay;
