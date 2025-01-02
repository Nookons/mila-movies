import React, {useEffect, useState} from 'react';
import {TMBD_Options} from "../../utils/TMBDOptions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Col, Descriptions, Divider, FloatButton, Image, Row, Space} from "antd";
import {IActorDetails, IMovie_credits, IPersonImages, ITvShow} from "../../type/Actors";
import {SINGLE_MOVIE} from "../../utils/const";
import Title from "antd/es/typography/Title";
import {useAppSelector} from "../../hooks/storeHooks";

const SingleActor = () => {
    const navigate = useNavigate();
    const language = useAppSelector(state => state.language.language);
    const [searchParams] = useSearchParams();
    const actor_id = searchParams.get('id');

    const [details, setDetails] = useState<IActorDetails | null>(null);
    const [images, setImages] = useState<IPersonImages | null>(null);
    const [movie_credits, setMovie_credits] = useState<IMovie_credits | null>(null);
    const [tv_credits, setTv_credits] = useState<ITvShow | null>(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${actor_id}?language=${language}-${language.toUpperCase()}`, TMBD_Options)
            .then(res => res.json())
            .then(res => setDetails(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/images`, TMBD_Options)
            .then(res => res.json())
            .then(res => setImages(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/movie_credits?language=${language}-${language.toUpperCase()}`, TMBD_Options)
            .then(res => res.json())
            .then(res => setMovie_credits(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${actor_id}/tv_credits?language=${language}-${language.toUpperCase()}`, TMBD_Options)
            .then(res => res.json())
            .then(res => setTv_credits(res))
            .catch(err => console.error(err));
    }, [actor_id, language]);

    if (!details || !images || !movie_credits || !tv_credits) {
        return null
    }

    return (
        <Row style={{padding: 14, maxWidth: 1400, margin: "0 auto"}} gutter={[16, 16]}>
            <Col xs={24} xl={8}>
                <Image
                    width={"100%"}
                    src={`https://www.themoviedb.org/t/p/w500${details.profile_path}`}
                />
            </Col>
            <Col xs={24} xl={16}>
                <Descriptions size={"small"} title={details.name}>
                    <Descriptions.Item span={3} label="Birthday">{details.birthday}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Place of Birth">{details.place_of_birth}</Descriptions.Item>
                    <Descriptions.Item span={3}
                                       label="Department">{details.known_for_department}</Descriptions.Item>
                    <Descriptions.Item span={3} label="popularity">{details.popularity}</Descriptions.Item>
                    <Descriptions.Item span={3} label="biography">{details.biography.slice(0, 250)}</Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span={24} style={{position: "relative"}}>
                <Title level={4}>Movie with {details.name}</Title>
                <Space style={{justifyContent: "space-between"}} wrap={true}>
                    {movie_credits.cast.slice(0, 5).map((movie, index) => {

                        if (!movie.poster_path) {
                            return (
                                <div style={{
                                    width: 65,
                                    backgroundColor: "rgba(0,0,0, 0.25)",
                                    height: "97.5px",
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
                                style={{cursor: "pointer", maxWidth: 65}}
                                onClick={() => navigate(`${SINGLE_MOVIE}?id=${movie.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )
                    })}
                </Space>
            </Col>
            <Col span={24} style={{position: "relative"}}>
                <Title level={4}>TV Shows with {details.name}</Title>
                <Space wrap={true}>
                    {tv_credits.cast.slice(0, 5).map((tv, index) => {

                        if (!tv.poster_path) {
                            return (
                                <div style={{
                                    width: 65,
                                    backgroundColor: "rgba(0,0,0, 0.25)",
                                    height: "97.5px",
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
                                style={{cursor: "pointer", maxWidth: 65}}
                                onClick={() => navigate(`${SINGLE_MOVIE}?id=${tv.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt={tv.name}
                            />
                        )
                    })}
                </Space>
            </Col>
            <Col span={24}>
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
        </Row>
    );
};

export default SingleActor;