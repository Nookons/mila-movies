import React, {FC} from 'react';
import Button from "antd/es/button";
import {Modal, Rate, Skeleton, Space} from "antd";
import {IMovie} from "../../../type/Movie";
import {
    BookOutlined,
    EyeInvisibleOutlined,
    EyeOutlined, HeartOutlined,
    MinusOutlined,
    PlusOutlined,
    SmileOutlined
} from '@ant-design/icons';
import {FrownOutlined} from "@ant-design/icons";
import {MehOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../hooks/storeHooks";
import ButtonGroup from "antd/es/button/button-group";
import {
    addFavoriteToBase,
    addWatchedToBase,
    addWatchToBase,
    removeFavoriteToBase, removeWatchedToBase,
    removeWatchToBase
} from "../../../utils/Movie";
import {SINGLE_MOVIE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";

interface PreviewModalProps {
    open: boolean;
    setPreview: (e: boolean) => void;
    previewMovie: IMovie | null;
}

const PreviewModal: FC<PreviewModalProps> = ({open, setPreview, previewMovie}) => {
    const navigate = useNavigate();
    const {favorite_movie} = useAppSelector(state => state.favorite_movies);
    const {watch_later} = useAppSelector(state => state.watch_later);
    const {watched} = useAppSelector(state => state.watched);

    if (!previewMovie) {
        return null
    }

    const isFavorite = favorite_movie.some(item => item.id === previewMovie.id);
    const isWatchingLater = watch_later.some(item => item.id === previewMovie.id);
    const isWatched = watched.some(item => item.id === previewMovie.id);

    const customIcons: Record<number, React.ReactNode> = {
        1: <FrownOutlined/>,
        2: <FrownOutlined/>,
        3: <MehOutlined/>,
        4: <SmileOutlined/>,
        5: <SmileOutlined/>,
    };

    const getClickType = async (type: string) => {
        switch (type) {
            case "favorite":
                await addFavoriteToBase(previewMovie);
                break;
            case "unfavorite":
                await removeFavoriteToBase(previewMovie.id);
                break;
            case "watch_later":
                await addWatchToBase(previewMovie);
                break;
            case "unwatch_later":
                await removeWatchToBase(previewMovie.id);
                break;
            case "watched":
                await addWatchedToBase(previewMovie);
                break;
            case "unwatched":
                await removeWatchedToBase(previewMovie.id);
                break;
        }
    };

    return (
        <Modal
            title={
                    <span>{previewMovie.title}</span>
            }
            open={open}
            onCancel={() => setPreview(false)}
            footer={[
                <ButtonGroup>
                    <Button onClick={() => getClickType(isFavorite ? "unfavorite" : "favorite")} key={"favorite"} type={"text"}>{isFavorite
                        ? <MehOutlined />
                        : <HeartOutlined />
                    }</Button>
                    <Button onClick={() => getClickType(isWatchingLater ? "unwatch_later" : "watch_later")} key={"watch_later"} type={"text"}>{isWatchingLater
                        ? <MinusOutlined />
                        : <PlusOutlined />
                    }</Button>
                    <Button onClick={() => getClickType(isWatched ? "unwatched" : "watched")} key={"watched"} type={"text"}>{isWatched
                        ? <EyeInvisibleOutlined />
                        : <EyeOutlined />
                    }</Button>
                    <Button onClick={() => navigate(`${SINGLE_MOVIE}?id=${previewMovie.id.toString()}`)} style={{maxWidth: "100%"}} key={"go"} type={"primary"}>Go watch</Button>
                </ButtonGroup>,
            ]}
        >
            <Space direction="vertical">
                <Rate
                    disabled
                    value={previewMovie.vote_average / 2}
                    defaultValue={3}
                    character={({index = 0}) => customIcons[index + 1]}
                />
                <span>{previewMovie.overview}</span>
            </Space>
        </Modal>
    );
};

export default PreviewModal;