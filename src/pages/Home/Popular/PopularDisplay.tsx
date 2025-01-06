import React, {useEffect, useState} from 'react';
import {IMovie, IMovieFull, IMovieResponse} from "../../../type/Movie";
import {Col, Pagination, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {SINGLE_MOVIE} from "../../../utils/const";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {
    addFavoriteToBase,
    addWatchedToBase,
    addWatchToBase,
    removeFavoriteToBase,
    removeWatchedToBase,
    removeWatchToBase
} from "../../../utils/Movie";

import {FloatButton} from 'antd';
import {
    DislikeOutlined,
    EyeInvisibleOutlined,
    EyeOutlined, InfoOutlined,
    LikeOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import {TMBD_Options} from "../../../utils/TMBDOptions";
import Button from "antd/es/button";
import PreviewModal from "./PreviewModal";

const PopularDisplay = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(Number(localStorage.getItem("page")) || 1);
    const [movies_data, setMovies_data] = useState<IMovieResponse | null>(null);

    const language = useAppSelector(state => state.language.language)


    const [isPreview, setIsPreview] = useState<boolean>(false);
    const [previewMovie, setPreviewMovie] = useState<IMovie | null>(null);


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

    const changePage = (page: number) => {
        setPage(page)
        localStorage.setItem("page", page.toString())
    }

    return (
        <div style={{width: "100%", margin: "0 auto"}}>
            <PreviewModal previewMovie={previewMovie}  open={isPreview} setPreview={setIsPreview}/>

            <Row style={{padding: "14px 4px"}} gutter={[4, 4]}>
                {movies_data?.results.map((movie, index) => {

                    const onPreviewClick = async () => {
                        await setPreviewMovie(movie);
                        await setIsPreview(true)
                    }

                    return (
                        <Col
                            xs={12}      // На очень маленьких экранах (мобильных)
                            sm={12}      // На небольших экранах (планшеты)
                            md={12}       // На средних экранах (ноутбуки)
                            lg={6}       // На больших экранах (десктопы)
                            xl={6}       // На очень больших экранах
                            key={index}
                            style={{position: "relative"}}
                        >
                            <img onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)} style={{maxWidth: "100%"}}
                                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                 alt={movie.title}/>
                            <Button
                                onClick={onPreviewClick}
                                style={{
                                    position: "absolute",
                                    top: 14,
                                    left: 14
                                }}
                                shape={"circle"}
                            >
                                <InfoOutlined/>
                            </Button>
                        </Col>
                    );
                })}
            </Row>
            <Pagination
                style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
                showQuickJumper
                total={movies_data?.total_pages ? movies_data.total_pages * 10 : 0} // Safe fallback to 0 if total_pages is undefined
                current={page}
                onChange={(e) => changePage(e)}
            />
        </div>
    );
};

export default PopularDisplay;
