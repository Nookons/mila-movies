import React, { useEffect, useState } from 'react';
import { Alert, Col, Divider, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../type/Movie";
import { SINGLE_MOVIE } from "../../utils/const";
import Slider from "react-slick"; // Import Slider component from slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define props interface
interface FavoriteDisplayProps {
    array: IMovie[];
    loading: boolean;
    error?: string | undefined;
    title?: string;
}

const FavoriteDisplay: React.FC<FavoriteDisplayProps> = ({ array, loading, error, title }) => {
    const navigate = useNavigate();
    const [reversed, setReversed] = useState<IMovie[]>([]);

    useEffect(() => {
        if (array.length) {
            setReversed([...array].reverse()); // Copy array and reverse it safely
        } else {
            setReversed([]); // Clear reversed array if original array is empty
        }
    }, [array]);

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <Alert style={{ margin: "14px 0" }} type="error" message="Can't load your favorite list, sorry 🥲" banner />;
    }

    if (!array.length) {
        return <Alert style={{ margin: "14px 0" }} message={<span>Сізде әлі сүйікті фильмдер жоқ 😅</span>} type="info" closeText="Жабу" />;
    }

    // Carousel settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,  // Show 4 slides at a time
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,  // For tablet screens
                settings: {
                    slidesToShow: 3,  // Show 3 slides on tablets
                },
            },
            {
                breakpoint: 768,  // For mobile screens
                settings: {
                    slidesToShow: 2,  // Show 2 slides on mobile
                },
            },
            {
                breakpoint: 480,  // For very small screens
                settings: {
                    slidesToShow: 4,  // Show 1 slide on very small screens
                },
            },
        ],
    };

    return (
        <>
            <Divider>{title}</Divider>
            <Slider {...settings}>
                {reversed.map((movie) => (
                    <div key={movie.id}>
                        <Row gutter={[16, 16]}>
                            <Col
                                xs={6}  // On very small screens (mobile)
                                sm={6}  // On small screens (tablets)
                                md={6}  // On medium screens (laptops)
                                lg={6}  // On large screens (desktops)
                                xl={6}  // On extra large screens
                                key={movie.id}>
                                <img
                                    onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                                    style={{ maxWidth: "100%", borderRadius: 6 }}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Col>
                        </Row>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default FavoriteDisplay;
