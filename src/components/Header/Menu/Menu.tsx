import React, {useEffect, useState} from 'react';
import {TMBD_Options} from "../../../utils/TMBDOptions";
import {useAppSelector} from "../../../hooks/storeHooks";
import {Col, Divider, Row, Space} from "antd";
import Button from "antd/es/button";
import {DownOutlined} from "@ant-design/icons";

import styles from './Menu.module.css'
import {useNavigate} from "react-router-dom";
import {GENRES} from "../../../utils/const";

export interface IGenre {
    id: number;
    name: string;
}

const Menu = () => {
    const navigate = useNavigate();
    const language = useAppSelector(state => state.language.language)

    const [movie_list, setMovie_list] = useState<IGenre[]>([]);
    const [tv_shows_list, setTv_shows_list] = useState<IGenre[]>([]);

    const [isMovieList, setIsMovieList] = useState<boolean>(false);
    const [isTvList, setIsTvList] = useState<boolean>(false);


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}`, TMBD_Options)
            .then(res => res.json())
            .then(res => {
                const result: IGenre[] = [];
                res.genres.map((el: IGenre) => {
                    result.push(el)
                })
                setMovie_list(result)
            })
            .catch(err => console.error(err));


        fetch(`https://api.themoviedb.org/3/genre/tv/list?language=${language}`, TMBD_Options)
            .then(res => res.json())
            .then(res => {
                const result: IGenre[] = [];
                res.genres.map((el: IGenre) => {
                    result.push(el)
                })
                setTv_shows_list(result)
            })
            .catch(err => console.error(err));
    }, [language]);

    const onMenuItemClick = () => {
        setIsMovieList(false)
        setIsTvList(false)
    }

    return (
        <Row gutter={[4, 4]}>
            <Col className={styles.Main_row} span={24}>
                <Space>
                    <div className={styles.Sub_menu}>
                        <Button
                            type={"text"}
                            onClick={() => setIsMovieList(!isMovieList)}
                        >
                            <span style={{
                                fontWeight: isMovieList ? 800 : 400,
                                color: isMovieList ? "#3143ff" : "black"
                            }}>
                                Movie
                            </span>
                            <DownOutlined style={{transform: `rotate(${isMovieList ? "180deg" : "0deg"})`}}/>
                        </Button>
                        <Row className={isMovieList ? styles.Sub_menu_wrapper_active : styles.Sub_menu_wrapper}
                             gutter={[4, 4]}>
                            {movie_list.map((movie) => {

                                return (
                                    <Col xs={12} md={8} xl={4}>
                                        <Button onClick={onMenuItemClick}
                                                type={"link"}>{movie.name}</Button>
                                        <Divider style={{margin: 4}}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    <div className={styles.Sub_menu}>
                        <Button
                            type={"text"}
                            onClick={() => setIsTvList(!isTvList)}
                        >
                            <span style={{
                                fontWeight: isTvList ? 800 : 400,
                                color: isTvList ? "#3143ff" : "black"
                            }}>
                                Shows
                            </span>
                            <DownOutlined style={{transform: `rotate(${isTvList ? "180deg" : "0deg"})`}}/>
                        </Button>
                        <Row className={isTvList ? styles.Sub_menu_wrapper_active : styles.Sub_menu_wrapper} gutter={[4, 4]}>
                            {tv_shows_list.map((movie) => {

                                return (
                                    <Col xs={12} md={8} xl={4}>
                                        <Button onClick={onMenuItemClick} type={"link"}>{movie.name}</Button>
                                        <Divider style={{margin: 4}}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    <div className={styles.Sub_menu}>
                        <Button type={"link"}>🔥 Top 100</Button>
                    </div>
                </Space>
            </Col>
        </Row>
    );
};

export default Menu;