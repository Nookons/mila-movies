import React, {useEffect, useState} from 'react';
import {IMovie, IMovieResponse} from "../../../type/Movie";
import {Col, message, Pagination, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {SINGLE_MOVIE} from "../../../utils/const";
import Button from "antd/es/button";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {addToFavorite} from "../../../store/reducers/favoriteMovies";
import {db} from "../../../firebase";
import {deleteDoc, doc, setDoc } from "firebase/firestore";
import {PlusCircleOutlined} from "@ant-design/icons";
import {addFavoriteToBase, removeFavoriteToBase} from "../../../utils/Movie";

const PopularDisplay = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [movies_data, setMovies_data] = useState<IMovieResponse | null>(null);

    const {favorite_movie} = useAppSelector(state => state.favorite_movies)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTczMTkxNDgxNS43MjM4MzY0LCJzdWIiOiI2NGQ1NzkzN2QxMDBiNjAwYWRhMDAyNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBArssuyWKerLl2OEN_2qM6ITzltfuHDHJjiYQ3ZlOY'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=${page}`, options)
            .then(res => res.json())
            .then(res => setMovies_data(res))
            .catch(err => console.error(err));

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [page])

    const addToFavoriteHandle = (movie: IMovie) => {
        try {
            addFavoriteToBase(movie)
            message.success("Successfully saved");
        } catch (err) {
            err && message.error(err.toString())
        }
    }

    const removeFavoriteHandle = async (movie: IMovie) => {
        try {
            removeFavoriteToBase(movie)
            message.success("Successfully removed");
        } catch (err) {
            err && message.error(err.toString())
        }
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                {movies_data?.results.map((movie, index) => {
                    const isFavy = favorite_movie.some(item => item.id === movie.id);
                    return (
                        <Col
                            xs={12}      // На очень маленьких экранах (мобильных)
                            sm={12}      // На небольших экранах (планшеты)
                            md={8}       // На средних экранах (ноутбуки)
                            lg={6}       // На больших экранах (десктопы)
                            xl={4}       // На очень больших экранах
                            key={index}
                            style={{position: "relative"}}
                        >
                            <img onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)} style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                 alt={movie.title}/>
                            <article>{movie.title}</article>
                            {isFavy
                                ? <Button
                                    style={{
                                        position: "absolute",
                                        top: 6,
                                        right: 14
                                    }}
                                    onClick={() => removeFavoriteHandle(movie)}>
                                    💩
                                </Button>
                                : <Button
                                    style={{
                                        position: "absolute",
                                        top: 6,
                                        right: 14
                                    }}
                                    onClick={() => addToFavoriteHandle(movie)}>
                                    ❤️‍🔥
                                </Button>

                            }
                        </Col>
                    )
                })}
            </Row>
            <Pagination
                style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
                showQuickJumper
                total={movies_data?.total_pages ? movies_data.total_pages * 10 : 0} // Safe fallback to 0 if total_pages is undefined
                current={page}
                onChange={setPage} // This will update the page when the user clicks a different page
            />
        </div>

    );
};

export default PopularDisplay;