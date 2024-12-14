import React, { FC } from 'react';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Col, Descriptions, Divider, Progress, Skeleton, Tag, Alert, FloatButton} from "antd";
import { IMovieFull } from "../../../type/Movie";
import { useMovieRuntime } from "../../../hooks/useMovieRuntime";
import MovieActors from "./MovieActors";
import Button from "antd/es/button";
import {UpCircleOutlined, YoutubeOutlined} from "@ant-design/icons";

interface DescriptionProps {
    current_movie: IMovieFull;
}

const MovieDescriptions: FC<DescriptionProps> = ({ current_movie }) => {
    const id = current_movie.id.toString()
    const { watched_time, loading, error } = useMovieRuntime(current_movie.id);

    const percentage = watched_time !== null ? (watched_time / current_movie.runtime) * 100 : 0;
    const roundedPercentage = parseFloat(percentage.toFixed(2)); // Преобразуем строку обратно в число

    return (
        <Col span={24}>
            <Text type="secondary">{current_movie.original_title}</Text>
            {loading ? (
                <Skeleton active />
            ) : error ? (
                <Alert message="Error" description={error} type="error" showIcon />
            ) : (
                <>
                    {watched_time &&
                        <Col span={24}>
                            <Progress
                                strokeColor={{
                                    "0%": "#108ee9",
                                    "100%": "#87d068",
                                }}
                                percent={roundedPercentage} // Теперь передаем число
                            />
                            <Text type="secondary">You stopped on {watched_time}m </Text>
                        </Col>
                    }
                </>
            )}
            <Title level={2}>
                {current_movie.title}
                {current_movie.homepage && (
                    <Button
                        style={{marginLeft: 14}}
                        onClick={() => window.location.href = current_movie.homepage}
                        shape="circle"
                    >
                        <YoutubeOutlined />
                    </Button>
                )}
            </Title>
            <Descriptions size="small" bordered={false}>
                <Descriptions.Item span={3} label="Languages">
                    {current_movie.spoken_languages.map((el) => (
                        <Tag key={el.iso_639_1}>{el.name}</Tag>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Production countries">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {current_movie.production_countries.map((el) => (
                            <Tag key={el.iso_3166_1} style={{ marginBottom: '4px' }}>
                                {el.name}
                            </Tag>
                        ))}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Actros">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <MovieActors movie_id={id} />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Genres">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {current_movie.genres.map((el) => (
                            <Tag key={el.id} style={{ marginBottom: '4px' }}>
                                {el.name}
                            </Tag>
                        ))}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Budget">
                    {current_movie.budget.toLocaleString()} $
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Release date">
                    {current_movie.release_date}
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Runtime">
                    {current_movie.runtime} m
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Companies">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {current_movie.production_companies.map((el) => (
                            <Tag key={el.id} style={{ marginBottom: '4px' }}>
                                {el.name}
                            </Tag>
                        ))}
                    </div>
                </Descriptions.Item>
            </Descriptions>
            <Divider dashed />
            <Text>{current_movie.overview}</Text>
        </Col>
    );
};

export default MovieDescriptions;
