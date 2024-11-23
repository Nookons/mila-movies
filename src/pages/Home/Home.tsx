import React from 'react';
import SearchMovie from "./Search/SearchMovie";
import {useAppSelector} from "../../hooks/storeHooks";
import {Avatar, Badge, Flex, Segmented, Space, Tabs, TabsProps} from "antd";
import MoviesSlider from "./MovieSlider/MoviesSlider";
import PopularDisplay from "./Popular/PopularDisplay";
import {useNavigate} from "react-router-dom";
import {EyeOutlined, HomeOutlined, LikeOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import Favorite from "../Favorite/Favorite";
import HomeChild from "./HomeChild";
import WatchLater from "../WatchLater/WatchLater";

const Home = () => {
    const {watch_later} = useAppSelector(state => state.watch_later)

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span>Home</span>,
            children: <HomeChild />,
        },
        {
            key: '2',
            label: <span>Favorite</span>,
            children: <Favorite />,
        },
        {
            key: '3',
            label: <Badge color={"#ffabab"} count={watch_later.length} overflowCount={100}><span>Watch later</span></Badge>,
            children: <WatchLater />,
        },
    ];

    return <Tabs style={{margin: 14}} defaultActiveKey="1" items={items} onChange={onChange} />
};

export default Home;