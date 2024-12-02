import React, { FC, useEffect, useState } from 'react';
import { DashboardOutlined } from "@ant-design/icons";
import { Col, FloatButton, InputNumber, Modal, Row, Slider } from "antd";
import { IMovieFull } from "../../type/Movie";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { useMovieRuntime } from "../../hooks/useMovieRuntime";

interface RuntimeModalProps {
    current_movie: IMovieFull;
}

const RuntimeModal: FC<RuntimeModalProps> = ({ current_movie }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { watched_time, loading, error } = useMovieRuntime(current_movie.id);
    const initialTime = watched_time ?? 1;

    const [inputValue, setInputValue] = useState<number>(initialTime);

    // Обновляем inputValue, когда watched_time изменяется
    useEffect(() => {
        if (watched_time !== null) {
            setInputValue(watched_time);  // Обновляем значение, если watched_time есть
        }
    }, [watched_time]);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);

        await setDoc(doc(db, "movies_runtime", current_movie.id.toString()), {
            already_watched_time: inputValue,
            full_time: current_movie.runtime,
            still_watching: current_movie.runtime - inputValue,
            movie_id: current_movie.id
        });

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onSliderChange = (newValue: number) => {
        setInputValue(newValue);
    };

    const onInputNumberChange = (newValue: number | string | null) => {
        setInputValue(Number(newValue));
    };

    const max = current_movie.runtime;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Modal
                title={<span>Add runtime note</span>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Slider
                            min={1}
                            max={max}
                            value={inputValue} // Контролируемое состояние
                            onChange={onSliderChange}
                        />
                    </Col>
                    <Col span={24}>
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={max}
                            value={inputValue} // Контролируемое состояние
                            addonBefore={current_movie.title}
                            addonAfter="Minutes"
                            onChange={onInputNumberChange}
                        />
                    </Col>
                </Row>
            </Modal>
            <FloatButton
                onClick={showModal}
                icon={<DashboardOutlined />}
            />
        </>
    );
};

export default RuntimeModal;
