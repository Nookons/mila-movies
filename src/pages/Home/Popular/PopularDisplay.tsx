import React, { useEffect, useState } from 'react';
import { IMovie, IMovieResponse } from "../../../type/Movie";
import { Col, Pagination, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { SINGLE_MOVIE } from "../../../utils/const";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import {
    addFavoriteToBase,
    addWatchedToBase,
    addWatchToBase,
    removeFavoriteToBase,
    removeWatchedToBase,
    removeWatchToBase
} from "../../../utils/Movie";

import { FloatButton } from 'antd';
import {
    DislikeOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LikeOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import { TMBD_Options } from "../../../utils/TMBDOptions";

const PopularDisplay = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [movies_data, setMovies_data] = useState<IMovieResponse | null>(null);

    const { favorite_movie } = useAppSelector(state => state.favorite_movies);
    const { watch_later } = useAppSelector(state => state.watch_later);
    const { watched } = useAppSelector(state => state.watched);

    const language = useAppSelector(state => state.language.language)


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=${language}-${language.toUpperCase()}&page=${page}`, TMBD_Options)
            .then(res => res.json())
            .then(res => setMovies_data(res))
            .catch(err => console.error(err));

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [language, page]); // Теперь зависимость от языка и страницы


    const getClickType = async (type: string, movie: IMovie) => {
        switch (type) {
            case "favorite":
                await addFavoriteToBase(movie);
                break;
            case "unfavorite":
                await removeFavoriteToBase(movie.id);
                break;
            case "watch_later":
                await addWatchToBase(movie);
                break;
            case "unwatch_later":
                await removeWatchToBase(movie.id);
                break;
            case "watched":
                await addWatchedToBase(movie);
                break;
            case "unwatched":
                await removeWatchedToBase(movie.id);
                break;
        }
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {movies_data?.results.map((movie, index) => {
                    const isF = favorite_movie.some(item => item.id === movie.id);
                    const isWL = watch_later.some(item => item.id === movie.id);
                    const isW = watched.some(item => item.id === movie.id);

                    return (
                        <Col
                            xs={12}      // На очень маленьких экранах (мобильных)
                            sm={12}      // На небольших экранах (планшеты)
                            md={8}       // На средних экранах (ноутбуки)
                            lg={6}       // На больших экранах (десктопы)
                            xl={4}       // На очень больших экранах
                            key={index}
                            style={{ position: "relative" }}
                        >
                            <img onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)} style={{ maxWidth: "100%" }}
                                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                 alt={movie.title} />
                            <FloatButton.Group
                                key={"top"}
                                trigger="click"
                                placement={"top"}
                                style={{
                                    position: "absolute",
                                    right: 24,
                                    bottom: 24
                                }}
                                icon={<UpOutlined />}
                            >
                                <FloatButton
                                    icon={isF
                                        ? <DislikeOutlined onClick={() => getClickType("unfavorite", movie)} />
                                        : <LikeOutlined onClick={() => getClickType("favorite", movie)} />
                                    } />
                                {!isW &&
                                    <FloatButton
                                        icon={isWL
                                            ? <MinusOutlined onClick={() => getClickType("unwatch_later", movie)} />
                                            : <PlusOutlined onClick={() => getClickType("watch_later", movie)} />
                                        } />
                                }
                                <FloatButton
                                    icon={isW
                                        ? <EyeInvisibleOutlined onClick={() => getClickType("unwatched", movie)} />
                                        : <EyeOutlined onClick={() => getClickType("watched", movie)} />
                                    } />
                            </FloatButton.Group>
                        </Col>
                    );
                })}
            </Row>
            <Pagination
                style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
                showQuickJumper
                total={movies_data?.total_pages ? movies_data.total_pages * 10 : 0} // Safe fallback to 0 if total_pages is undefined
                current={page}
                onChange={setPage} // This will update the page when the user clicks a different page
            />
        </div>
    );
};

export default PopularDisplay;
