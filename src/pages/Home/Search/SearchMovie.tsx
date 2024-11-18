import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import {Col, Drawer, DrawerProps, message, Pagination, RadioChangeEvent, Row} from "antd";
import Button from "antd/es/button";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IMovie, IMovieResponse} from "../../../type/Movie";
import {SINGLE_MOVIE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";

const SearchMovie = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [search_value, setSearch_value] = useState<string>("");
    const [result_search_data, setResult_search_data] = useState<IMovieResponse | null>(null);
    const [movies_data, setMovies_data] = useState<IMovie[]>([]);

    const onSearch = async () => {
        showDrawer();
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTczMTkxNDgxNS43MjM4MzY0LCJzdWIiOiI2NGQ1NzkzN2QxMDBiNjAwYWRhMDAyNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBArssuyWKerLl2OEN_2qM6ITzltfuHDHJjiYQ3ZlOY'
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${search_value}&include_adult=false&language=ru-RU&page=1`, options)
            .then(res => res.json())
            .then(res => setResult_search_data(res))
            .catch(err => console.error(err));
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (result_search_data) {
            setMovies_data(result_search_data.results)
        }
    }, [result_search_data]);

    return (
        <div style={{position: "relative"}}>
            <Search
                onSearch={onSearch}
                value={search_value}
                onChange={(event) => setSearch_value(event.target.value)}
                style={{margin: "14px 0"}}
                placeholder="Фильмді мына жерден таба аласыз"
                enterButton size="large"
                loading={false}
            />
            <div>
                <Drawer
                    extra={[<Button onClick={onClose} type={"text"}><CloseCircleOutlined style={{fontSize: 16}}/></Button>]}
                    style={{position: "absolute"}}
                    title="Basic Drawer"
                    placement={'bottom'}
                    width="100%" // Set width to 100% to prevent overflow horizontally
                    closable={false}
                    onClose={onClose}
                    key={"12331241525126"}
                    open={open}
                    height={"100%"}>

                    <Row gutter={[16, 16]}>
                        {movies_data.map((movie, index) => (
                            <Col
                                onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                                xs={12}      // На очень маленьких экранах (мобильных)
                                sm={12}      // На небольших экранах (планшеты)
                                md={8}       // На средних экранах (ноутбуки)
                                lg={6}       // На больших экранах (десктопы)
                                xl={4}       // На очень больших экранах
                                key={index}
                            >
                                <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                     alt={movie.title}/>
                                <article>{movie.title}</article>
                            </Col>
                        ))}
                    </Row>

                    {result_search_data &&
                        <>
                            {   result_search_data?.page > 1 && <Pagination simple defaultCurrent={2} total={50}/> }
                        </>
                    }
                </Drawer>
            </div>
        </div>
    );
};

export default SearchMovie;