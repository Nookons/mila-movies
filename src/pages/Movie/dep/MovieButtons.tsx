import React, { FC, useEffect, useState, useCallback } from 'react';
import {
    DashboardOutlined,
    DislikeOutlined,
    EyeInvisibleOutlined, EyeOutlined,
    LikeOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { IMovieFull } from "../../../type/Movie";
import {
    addFavoriteToBase,
    addWatchedToBase,
    addWatchToBase,
    removeFavoriteToBase, removeWatchedToBase,
    removeWatchToBase
} from "../../../utils/Movie";
import { useAppSelector } from "../../../hooks/storeHooks";
import RuntimeModal from "./RuntimeModal";


interface MovieButtonsProps {
    current_movie: IMovieFull;
}

const MovieButtons: FC<MovieButtonsProps> = ({ current_movie }) => {
    const { favorite_movie } = useAppSelector(state => state.favorite_movies);
    const { watch_later } = useAppSelector(state => state.watch_later);
    const { watched } = useAppSelector(state => state.watched);
    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState({
        isF: false,
        isWL: false,
        isW: false
    });

    const showModal = () => {
        setOpen(true); // Open the Drawer when the button is clicked
    };

    useEffect(() => {
        if (current_movie) {
            setStatus({
                isF: favorite_movie.some(item => item.id === current_movie.id),
                isWL: watch_later.some(item => item.id === current_movie.id),
                isW: watched.some(item => item.id === current_movie.id)
            });
        }
    }, [watched, watch_later, favorite_movie, current_movie]);

    const getClickType = useCallback(async (type: string, movieId: number) => {

        const actions: Record<string, Function> = {
            favorite: addFavoriteToBase,
            unfavorite: removeFavoriteToBase,
            watch_later: addWatchToBase,
            unwatch_later: removeWatchToBase,
            watched: addWatchedToBase,
            unwatched: removeWatchedToBase,
        };

        const action = actions[type];

        if (action) {
            await action(type === 'unfavorite' || type === 'unwatch_later' || type === 'unwatched' ? movieId : current_movie);
        }
    }, [current_movie]);

    const getIconForButton = useCallback((type: string) => {

        const icons: Record<string, React.ReactNode> = {
            favorite: status.isF ? <DislikeOutlined /> : <LikeOutlined />,
            watch_later: status.isWL ? <MinusOutlined /> : <PlusOutlined />,
            watched: status.isW ? <EyeInvisibleOutlined /> : <EyeOutlined />,
        };

        return icons[type];
    }, [status]);

    return (
        <FloatButton.Group
            key="top"
            trigger="click"
            placement="top"
            style={{
                position: "absolute",
            }}
            icon={<UpOutlined />}
        >
            <FloatButton
                icon={getIconForButton("favorite")}
                onClick={() => getClickType(status.isF ? "unfavorite" : "favorite", current_movie.id)}
            />
            {!status.isW && (
                <FloatButton
                    icon={getIconForButton("watch_later")}
                    onClick={() => getClickType(status.isWL ? "unwatch_later" : "watch_later", current_movie.id)}
                />
            )}
            <FloatButton
                icon={getIconForButton("watched")}
                onClick={() => getClickType(status.isW ? "unwatched" : "watched", current_movie.id)}
            />
            <FloatButton
                onClick={showModal}
                icon={<DashboardOutlined />}
                tooltip="Set Movie Runtime"
            />
            <RuntimeModal setOpen={setOpen} open={open} current_movie={current_movie} />
        </FloatButton.Group>
    );
};

export default MovieButtons;
