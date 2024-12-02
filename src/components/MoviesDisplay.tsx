import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {Alert, Col, Row, Skeleton} from "antd";
import {SINGLE_MOVIE} from "../utils/const";
import {IMovie} from "../type/Movie";
import Title from "antd/es/typography/Title";

interface MoviesDisplayProps {
    array: IMovie[];
    loading: boolean;
    error?: string;
    title?: string;
}

const MoviesDisplay:FC<MoviesDisplayProps> = ({array, loading, error, title}) => {
    const navigate = useNavigate();

    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return (
            <Alert
                style={{margin: 14}}
                message={<span>Error</span>}
                description={<span>Something went wrong when fetching your want to watch list</span>}
                type="error"
                showIcon
            />
        )
    }

    return (
        <Row gutter={[4, 4]}>
            <Col span={24}>
                <Title level={4}>{title}</Title>
            </Col>
            {array.map((movie, index) => {
                return (
                    <Col
                        key={index}
                        xs={6}
                        xl={4}
                    >
                        <img onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)} style={{maxWidth: "100%"}}
                             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                             alt={movie.title}/>
                    </Col>
                )
            })}
        </Row>
    );
};

export default MoviesDisplay;