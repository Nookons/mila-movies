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
import {SIGN_IN_ROUTE, SINGLE_MOVIE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";

interface PreviewModalProps {
    open: boolean;
    setPreview: (e: boolean) => void;
    previewMovie: IMovie | null;
}

const PreviewModal: FC<PreviewModalProps> = ({open, setPreview, previewMovie}) => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user)

    if (!previewMovie) {
        return null
    }

    const customIcons: Record<number, React.ReactNode> = {
        1: <FrownOutlined/>,
        2: <FrownOutlined/>,
        3: <MehOutlined/>,
        4: <SmileOutlined/>,
        5: <SmileOutlined/>,
    };

    const getClickType = async (type: string) => {
        if (!user) {
            navigate(SIGN_IN_ROUTE)
            return
        }
        await addFavoriteToBase(previewMovie, user);
        console.log("test")
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
                    <Button onClick={() => getClickType("favorite")} key={"favorite"}
                            type={"text"}><MehOutlined/></Button>
                    <Button onClick={() => getClickType("watch_later")} key={"watch_later"}
                            type={"text"}><MinusOutlined/></Button>
                    <Button onClick={() => getClickType("watched")} key={"watched"}
                            type={"text"}><EyeInvisibleOutlined/></Button>
                    <Button onClick={() => navigate(`${SINGLE_MOVIE}?id=${previewMovie.id.toString()}`)}
                            style={{maxWidth: "100%"}} key={"go"} type={"primary"}>Go watch</Button>
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