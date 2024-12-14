import React, {FC, useEffect, useState} from 'react';
import {DashboardOutlined} from '@ant-design/icons';
import {Button, Drawer, InputNumber, message, Slider, Space, FloatButton} from 'antd';
import {IMovieFull} from '../../../type/Movie';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../firebase';
import {useMovieRuntime} from '../../../hooks/useMovieRuntime';

interface RuntimeModalProps {
    current_movie: IMovieFull;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RuntimeModal: FC<RuntimeModalProps> = ({current_movie, setOpen, open}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const {watched_time, loading, error} = useMovieRuntime(current_movie.id);
    const initialTime = watched_time ?? 1;

    const [inputValue, setInputValue] = useState<number>(initialTime);

    useEffect(() => {
        if (watched_time !== null) {
            setInputValue(watched_time); // Update value when watched_time is available
        }
    }, [watched_time]);

    const handleOk = async () => {
        setConfirmLoading(true);

        await setDoc(doc(db, 'movies_runtime', current_movie.id.toString()), {
            already_watched_time: inputValue,
            full_time: current_movie.runtime,
            still_watching: current_movie.runtime - inputValue,
            movie_id: current_movie.id,
        });

        setOpen(false); // Close the Drawer after the operation
        setConfirmLoading(false);
        message.success('Movie runtime was updated successfully!');
    };

    const handleCancel = () => {
        setOpen(false); // Close the Drawer when cancel is clicked
    };

    const onSliderChange = (newValue: number) => {
        setInputValue(newValue); // Update value on slider change
    };

    const onInputNumberChange = (newValue: number | string | null) => {
        setInputValue(Number(newValue)); // Update value when input number is changed
    };

    const max = current_movie.runtime;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Drawer
            title="Movie Runtime"
            placement="top"
            width={500}
            onClose={handleCancel}
            open={open} // Controlled state for Drawer visibility
            extra={
                <Space>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={handleOk} loading={confirmLoading}>
                        OK
                    </Button>
                </Space>
            }
        >
            <Slider
                min={1}
                max={max}
                value={inputValue} // Controlled value
                onChange={onSliderChange}
            />
            <InputNumber
                style={{width: '100%'}}
                min={1}
                max={max}
                value={inputValue} // Controlled value
                addonAfter="Minutes"
                onChange={onInputNumberChange}
            />
        </Drawer>
    );
};

export default RuntimeModal;
