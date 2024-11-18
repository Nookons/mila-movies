import React, {useEffect, useState} from 'react';
import {getSearchParamsForLocation} from "react-router-dom/dist/dom";
import {useSearchParams} from "react-router-dom";
import {IMovie, IMovieFull} from "../../type/Movie";
import {Col, Descriptions, Divider, message, Row, Skeleton, Space, Tag} from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Trailer from "./Trailer";
import Button from "antd/es/button";
import {addFavoriteToBase, removeFavoriteToBase} from "../../utils/Movie";
import {useAppSelector} from "../../hooks/storeHooks";

const Single = () => {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');

    const {favorite_movie} = useAppSelector(state => state.favorite_movies)

    const [current_movie, setCurrent_movie] = useState<IMovieFull | null>(null);

    const [isFavy, setIsFavy] = useState<boolean>(false);

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

    useEffect(() => {
        if (current_movie) {
            const isFavy = favorite_movie.some(item => item.id === current_movie.id);
            setIsFavy(isFavy);
        }
    }, [favorite_movie, current_movie]);


    if (!current_movie) {
        return <Skeleton/>
    }

    const addToFavoriteHandle = () => {
        try {
            const data: IMovie = {
                adult: current_movie.adult,
                backdrop_path: current_movie.backdrop_path,
                id: current_movie.id,
                original_language: current_movie.original_language,
                original_title: current_movie.original_title,
                overview: current_movie.overview,
                popularity: current_movie.popularity,
                poster_path: current_movie.poster_path,
                release_date: current_movie.release_date,
                title: current_movie.title,
                video: current_movie.video,
                vote_average: current_movie.vote_average,
                vote_count: current_movie.vote_count,
            }
            addFavoriteToBase(data)
            message.success("Successfully saved");
        } catch (err) {
            err && message.error(err.toString())
        }
    }

    const removeFavoriteHandle = async () => {
        try {
            const data: IMovie = {
                adult: current_movie.adult,
                backdrop_path: current_movie.backdrop_path,
                id: current_movie.id,
                original_language: current_movie.original_language,
                original_title: current_movie.original_title,
                overview: current_movie.overview,
                popularity: current_movie.popularity,
                poster_path: current_movie.poster_path,
                release_date: current_movie.release_date,
                title: current_movie.title,
                video: current_movie.video,
                vote_average: current_movie.vote_average,
                vote_count: current_movie.vote_count,
            }
            removeFavoriteToBase(data)
            message.success("Successfully removed");
        } catch (err) {
            err && message.error(err.toString())
        }
    }

    return (
        <Row style={{marginTop: 14}} gutter={[16, 16]}>
            <Col span={24}>
                {isFavy
                    ? <Space>
                        <Button onClick={() => removeFavoriteHandle()}>💩 Таңдаулыдан алып тастаңыз</Button>
                    </Space>
                    : <Space>
                        <Button onClick={() => addToFavoriteHandle()}>❤️‍🔥 Таңдаулыға қосу</Button>
                    </Space>
                }
            </Col>
            <Col span={24}>
                <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${current_movie.poster_path}`}/>
            </Col>
            <Col span={24}>
                <Title level={2}>{current_movie.title}</Title>
                <Text type="secondary">{current_movie.original_title}</Text>
                <Divider dashed/>
                <Descriptions>
                    <Descriptions.Item span={3}
                                       label="Түпнұсқа тіл">{current_movie.original_language}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Сөйлеу тілдері">{current_movie.spoken_languages.map(el => (
                        <Tag>{el.name}</Tag>))}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Өндіруші елдер">
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {current_movie.production_countries.map(el => (
                                <Tag key={el.iso_3166_1} style={{marginBottom: '4px'}}>
                                    {el.name}
                                </Tag>
                            ))}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Жанрлар">
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {current_movie.genres.map(el => (
                                <Tag key={el.id} style={{marginBottom: '4px'}}>
                                    {el.name}
                                </Tag>
                            ))}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item span={3}
                                       label="Бюджет">{current_movie.budget.toLocaleString()} $</Descriptions.Item>
                    {/*<Descriptions.Item label="revenue">{current_movie.revenue.toLocaleString()} $</Descriptions.Item>*/}
                    <Descriptions.Item span={3} label="Шығарылған_күн">{current_movie.release_date}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Орындалу уақыты">{current_movie.runtime}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Өндірістік компаниялар">
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {current_movie.production_companies.map(el => (
                                <Tag key={el.id} style={{marginBottom: '4px'}}>
                                    {el.name}
                                </Tag>
                            ))}
                        </div>
                    </Descriptions.Item>
                </Descriptions>
                <Divider dashed/>
                <Text>{current_movie.overview}</Text>
            </Col>
            <Col span={24}>
                {movie_id && <Trailer movie_id={movie_id}/>}
            </Col>
        </Row>
    );
};

export default Single;