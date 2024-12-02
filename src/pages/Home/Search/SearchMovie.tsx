import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import {Col, Drawer, DrawerProps, message, Pagination, RadioChangeEvent, Row, Skeleton, Tag} from "antd";
import Button from "antd/es/button";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IMovie, IMovieResponse} from "../../../type/Movie";
import {SINGLE_MOVIE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";
import Text from "antd/es/typography/Text";
import {TMBD_Options} from "../../../utils/TMBDOptions";

const SearchMovie = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [search_value, setSearch_value] = useState<string>("");
    const [result_search_data, setResult_search_data] = useState<IMovieResponse | null>(null);
    const [movies_data, setMovies_data] = useState<IMovie[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onSearch = async () => {
        showDrawer();

        fetch(`https://api.themoviedb.org/3/search/movie?query=${search_value}&include_adult=false&language=ru-RU&page=1`, TMBD_Options)
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setResult_search_data(res)
            })
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
                    title={<span>Search Drawer for <Tag><span>{search_value}</span></Tag></span>}
                    placement={'bottom'}
                    width="100%" // Set width to 100% to prevent overflow horizontally
                    closable={false}
                    onClose={onClose}
                    key={"12331241525126"}
                    open={open}
                    height={"100%"}>

                    {isLoading
                        ? <Skeleton />
                        : <Row gutter={[16, 16]}>
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
                                    <img style={{maxWidth: "100%"}} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://varietypaints.com.au/cdn/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"}
                                         alt={movie.title}/>
                                    <Text style={{margin: 4}}>{movie.title}</Text>

                                </Col>
                            ))}
                        </Row>
                    }

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