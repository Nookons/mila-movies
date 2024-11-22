import React, { useEffect, useState, useRef } from 'react';
import { Alert, Divider, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {IMovie} from "../../../type/Movie";
import {SINGLE_MOVIE} from "../../../utils/const";

interface FavoriteDisplayProps {
    array: IMovie[];
    loading: boolean;
    error?: string;
    title?: string;
}

const MoviesSlider: React.FC<FavoriteDisplayProps> = ({ array, loading, error, title }) => {
    const navigate = useNavigate();
    const [reversed, setReversed] = useState<IMovie[]>([]);
    const sliderRef = useRef<any>(null);

    useEffect(() => {
        if (array.length) {
            setReversed([...array].reverse());
        } else {
            setReversed([]);
        }
    }, [array]);

    useEffect(() => {
        if (sliderRef.current && reversed.length) {
            // Даем небольшую задержку перед инициализацией слайдера
            setTimeout(() => {
                sliderRef.current.slickGoTo(0); // Инициализируем слайдер с первого слайда
            }, 100);
        }
    }, [reversed]);

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <Alert style={{ margin: "14px 0" }} type="error" message="Can't load your favorite list, sorry 🥲" banner />;
    }

    if (!array.length) {
        return <Alert style={{ margin: "14px 0" }} message={<span>Сізде әлі сүйікті фильмдер жоқ 😅</span>} type="info" closeText="Жабу" />;
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 12,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 12,
                    slidesToScroll: 12,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                dots: false,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 4,
                },
            },
            {
                breakpoint: 480,
                dots: false,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <Divider>{title}</Divider>
            <Slider ref={sliderRef} {...settings}>
                {reversed.slice(0, 24).map((movie, index) => (
                    <div key={index} style={{
                        padding: "14px",
                        width: '100%',
                        backgroundColor: "#000000",
                    }}>
                        <img onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                             style={{ maxWidth: "90%", marginRight: 14, borderRadius: 4 }}
                             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                             alt={movie.title} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MoviesSlider;
