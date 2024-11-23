import React, {useEffect, useState} from 'react';
import {getSearchParamsForLocation} from "react-router-dom/dist/dom";
import {useSearchParams} from "react-router-dom";
import {IMovie, IMovieFull} from "../../type/Movie";
import {Col, Descriptions, Divider, FloatButton, message, Row, Skeleton, Space, Tag} from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Trailer from "./Trailer";
import Button from "antd/es/button";
import {
    addFavoriteToBase,
    addWatchedToBase,
    addWatchToBase,
    removeFavoriteToBase, removeWatchedToBase,
    removeWatchToBase
} from "../../utils/Movie";
import {useAppSelector} from "../../hooks/storeHooks";
import {
    DislikeOutlined,
    EyeInvisibleOutlined, EyeOutlined,
    LikeOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";

const Single = () => {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');

    const {favorite_movie} = useAppSelector(state => state.favorite_movies)
    const {watch_later} = useAppSelector(state => state.watch_later)
    const {watched} = useAppSelector(state => state.watched)

    const [current_movie, setCurrent_movie] = useState<IMovieFull | null>(null);

    const [isF, setIsF] = useState<boolean>(false);
    const [isWL, setIsWL] = useState<boolean>(false);
    const [isW, setIsW] = useState<boolean>(false);

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
            const isF = favorite_movie.some(item => item.id === current_movie.id);
            const isWL = watch_later.some(item => item.id === current_movie.id);
            const isW = watched.some(item => item.id === current_movie.id);
            setIsF(isF);
            setIsWL(isWL);
            setIsW(isW);
        }
    }, [watched, watch_later, favorite_movie, current_movie]);


    if (!current_movie) {
        return <Skeleton/>
    }


    const getClickType = async (type: string, movie: IMovie) => {
        switch (type) {
            case "favorite":
                await addFavoriteToBase(movie)
                break;
            case "unfavorite":
                await removeFavoriteToBase(movie.id)
                break;
            case "watch_later":
                await addWatchToBase(movie)
                break;
            case "unwatch_later":
                await removeWatchToBase(movie.id)
                break;
            case "watched":
                await addWatchedToBase(movie)
                break;
            case "unwatched":
                await removeWatchedToBase(movie.id)
                break;
        }
    }

    return (
        <Row style={{margin: "14px 0", padding: 14}} gutter={[16, 16]}>
            <Col span={24}>
                <img style={{maxWidth: "100%", position: "relative"}}
                     src={`https://image.tmdb.org/t/p/w500${current_movie.poster_path}`}/>
                <FloatButton.Group
                    key={"top"}
                    trigger="click"
                    placement={"top"}
                    style={{
                        position: "absolute",
                    }}
                    icon={<UpOutlined/>}
                >
                    <FloatButton
                        icon={isF
                            ? <DislikeOutlined onClick={() => getClickType("unfavorite", current_movie)}/>
                            : <LikeOutlined onClick={() => getClickType("favorite", current_movie)}/>
                        }/>
                    {!isW &&
                        <FloatButton
                            icon={isWL
                                ? <MinusOutlined onClick={() => getClickType("unwatch_later", current_movie)}/>
                                : <PlusOutlined onClick={() => getClickType("watch_later", current_movie)}/>
                            }/>
                    }
                    <FloatButton
                        icon={isW
                            ? <EyeInvisibleOutlined onClick={() => getClickType("unwatched", current_movie)}/>
                            : <EyeOutlined onClick={() => getClickType("watched", current_movie)}/>
                        }/>
                </FloatButton.Group>
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