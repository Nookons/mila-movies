import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {Alert, Col, Input, Row, Skeleton} from "antd";
import {SINGLE_MOVIE} from "../utils/const";
import {IMovie} from "../type/Movie";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";

interface MoviesDisplayProps {
    array: IMovie[];
    loading: boolean;
    error?: string;
    title?: string;
}

const MoviesDisplay:FC<MoviesDisplayProps> = ({array, loading, error, title}) => {
    const navigate = useNavigate();
    const [search_value, setSearch_value] = useState<string>('');
    const [filtered_data, setFiltered_data] = useState<IMovie[]>([]);

    useEffect(() => {
        const filtered = array.filter(movie =>
            movie.title.toLowerCase().includes(search_value.toLowerCase())
        );
        setFiltered_data(filtered);
    }, [search_value, array]);

    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return (
            <Alert
                style={{margin: 14}}
                message={<span>Error</span>}
                description={<span>Something went wrong when fetching your want list</span>}
                type="error"
                showIcon
            />
        )
    }

    return (
        <Row gutter={[4, 4]}>
            <Col span={24}>
                <Title level={4}>{title}</Title>
                <Search
                    value={search_value}
                    onChange={e => setSearch_value(e.target.value)}
                    style={{margin: "14px 0"}}
                    placeholder="Start write movie title to serach..."
                    enterButton
                />
            </Col>
            {filtered_data.map((movie, index) => {
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