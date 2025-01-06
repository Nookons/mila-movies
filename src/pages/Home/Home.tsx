import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import {Avatar, Badge, Flex, Menu, MenuProps, Segmented, Space, Tabs, TabsProps} from "antd";
import Favorite from "../Favorite/Favorite";
import HomeChild from "./HomeChild";
import WatchLater from "../WatchLater/WatchLater";
import Watched from "../Watched/Watched";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import PopularDisplay from "./Popular/PopularDisplay";
import {TMBD_Options} from "../../utils/TMBDOptions";

type MenuItem = Required<MenuProps>['items'][number];

export interface IGenre {
    id: number;
    name: string;
}

const Home = () => {
    const {watch_later} = useAppSelector(state => state.watch_later)
    const {watched} = useAppSelector(state => state.watched)


    useEffect(() => {
        const offset = localStorage.getItem("scroll_offset");

        if (offset && !isNaN(Number(offset)) && Number(offset) > 0) {
            const checkHeightAndScroll = () => {
                const pageHeight = document.documentElement.scrollHeight;

                if (pageHeight > Number(offset)) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: Number(offset),
                            behavior: 'smooth',
                        });
                    }, 250)
                } else {
                    requestAnimationFrame(checkHeightAndScroll);
                }
            };
            checkHeightAndScroll();
        }
    }, []);



    // const items: TabsProps['items'] = [
    //     {
    //         key: '1',
    //         label: <span>Home</span>,
    //         children: <HomeChild />,
    //     },
    //     {
    //         key: '2',
    //         label: <span>Favorite</span>,
    //         children: <Favorite />,
    //     },
    //     {
    //         key: '3',
    //         label: <Badge color={"#ffabab"} count={watch_later.length} overflowCount={100}><span>Watch later</span></Badge>,
    //         children: <WatchLater />,
    //     },
    //     {
    //         key: '4',
    //         label: <span>Watched</span>,
    //         children: <Watched />,
    //     },
    // ];

    return (
        <>
            <PopularDisplay/>
            {/*<Tabs style={{margin: 14}} defaultActiveKey="1" items={items} />*/}
        </>
    )
};

export default Home;