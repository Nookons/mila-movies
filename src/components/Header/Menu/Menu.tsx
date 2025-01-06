import React, {useEffect, useState} from 'react';
import {TMBD_Options} from "../../../utils/TMBDOptions";
import {useAppSelector} from "../../../hooks/storeHooks";
import {Col, Divider, Row, Space} from "antd";
import Button from "antd/es/button";
import {DownOutlined} from "@ant-design/icons";

import styles from './Menu.module.css'
import {text} from "node:stream/consumers";

export interface IGenre {
    id: number;
    name: string;
}

const Menu = () => {
    const language = useAppSelector(state => state.language.language)

    const [movie_list, setMovie_list] = useState<IGenre[]>([]);
    const [tv_shows_list, setTv_shows_list] = useState<IGenre[]>([]);


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

    return (
        <Row style={{padding: 4}} gutter={[16, 16]}>
            <Col span={24}>
                <Space>
                    <div className={styles.Sub_menu}>
                        <Button type={"text"}>Movie list <DownOutlined/></Button>
                        <Row className={styles.Sub_menu_wrapper} gutter={[4, 4]}>
                            {movie_list.map((movie) => {

                                return (
                                    <Col xs={12} md={8} xl={4}>
                                        <Button style={{textWrap: "wrap"}} type={"text"}>{movie.name}</Button>
                                        <Divider style={{margin: 4}}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    <div className={styles.Sub_menu}>
                        <Button type={"text"}>TV Shows <DownOutlined/></Button>
                        <Row className={styles.Sub_menu_wrapper} gutter={[4, 4]}>
                            {tv_shows_list.map((movie) => {

                                return (
                                    <Col xs={12} md={8} xl={4}>
                                        <Button style={{textWrap: "wrap"}} type={"text"}>{movie.name}</Button>
                                        <Divider style={{margin: 4}}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </Space>
            </Col>
        </Row>
    );
};

export default Menu;