import React, {useEffect, useState} from 'react';
import {TMBD_Options} from "../../utils/TMBDOptions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Col, Descriptions, Divider, FloatButton, Image, Row, Space} from "antd";
import {IActorDetails, IMovie_credits, IPersonImages, ITvShow} from "../../type/Actors";
import {SINGLE_MOVIE} from "../../utils/const";
import Title from "antd/es/typography/Title";

const SingleActor = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const actor_id = searchParams.get('id');

    const [details, setDetails] = useState<IActorDetails | null>(null);
    const [images, setImages] = useState<IPersonImages | null>(null);
    const [movie_credits, setMovie_credits] = useState<IMovie_credits | null>(null);
    const [tv_credits, setTv_credits] = useState<ITvShow | null>(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${actor_id}?language=en-EN`, TMBD_Options)
            .then(res => res.json())
            .then(res => setDetails(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/images`, TMBD_Options)
            .then(res => res.json())
            .then(res => setImages(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/movie_credits?language=ru-RU`, TMBD_Options)
            .then(res => res.json())
            .then(res => setMovie_credits(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/tv_credits?language=ru-RU`, TMBD_Options)
            .then(res => res.json())
            .then(res => setTv_credits(res))
            .catch(err => console.error(err));
    }, [actor_id]);

    useEffect(() => {
        console.log(tv_credits);
    }, [tv_credits]);

    if (!details || !images || !movie_credits || !tv_credits) {
        return null
    }

    return (
        <Row style={{padding: 14, maxWidth: 1400, margin: "0 auto"}} gutter={[16, 16]}>
            <Col xs={8} xl={8}>
                <Image
                    width={"100%"}
                    src={`https://www.themoviedb.org/t/p/w500${details.profile_path}`}
                />
            </Col>
            <Col xs={16} xl={16}>
                <Descriptions title={details.name}>
                    <Descriptions.Item span={3} label="Birthday">{details.birthday}</Descriptions.Item>
                    <Descriptions.Item span={3} label="place_of_birth">{details.place_of_birth}</Descriptions.Item>
                    <Descriptions.Item span={3} label="also_known_as">
                        {details.also_known_as.join(", ")}
                    </Descriptions.Item>
                    <Descriptions.Item span={3}
                                       label="known_for_department">{details.known_for_department}</Descriptions.Item>
                    <Descriptions.Item span={3} label="popularity">{details.popularity}</Descriptions.Item>
                    <Descriptions.Item span={3} label="biography">{details.biography.slice(0, 250)}</Descriptions.Item>
                </Descriptions>
                <Space wrap={true} style={{marginTop: 24}}>
                    {images.profiles.map((image) => {
                        return (
                            <Image
                                width={85}
                                src={`https://www.themoviedb.org/t/p/w500${image.file_path}`}
                            />
                        )
                    })}
                </Space>
            </Col>
            <Col span={12} style={{position: "relative"}}>
                <Title level={3}>Also movie with {details.name}</Title>
                <Space wrap={true}>
                    {movie_credits.cast.map((movie, index) => {

                        if (!movie.poster_path) {
                            return (
                                <div style={{
                                    minWidth: 150,
                                    backgroundColor: "rgba(0,0,0, 0.25)",
                                    height: "225px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <article>NO IMAGE</article>
                                </div>
                            )
                        }

                        return (
                            <img
                                style={{cursor: "pointer", maxWidth: 150}}
                                onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )
                    })}
                </Space>
            </Col>
            <Col span={12} style={{position: "relative"}}>
                <Title level={3}>Also TV Shows with {details.name}</Title>
                <Space wrap={true}>
                    {tv_credits.cast.map((tv, index) => {

                        if (!tv.poster_path) {
                            return (
                                <div style={{
                                    minWidth: 150,
                                    backgroundColor: "rgba(0,0,0, 0.25)",
                                    height: "225px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <article>NO IMAGE</article>
                                </div>
                            )
                        }

                        return (
                            <img
                                style={{cursor: "pointer", maxWidth: 150}}
                                onClick={() => navigate(`${SINGLE_MOVIE}?id=${tv.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt={tv.name}
                            />
                        )
                    })}
                </Space>
            </Col>
        </Row>
    );
};

export default SingleActor;