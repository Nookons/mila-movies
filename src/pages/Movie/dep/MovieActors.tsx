import React, {FC, useEffect, useState} from 'react';
import useMovieActors from "../../../hooks/useMovieActors";
import {Alert, Avatar, Badge, Col, Descriptions, Progress, Rate, Row, Skeleton, Statistic, Tag, Tooltip} from "antd";
import {IActor} from "../../../type/Actors";
import {TMBD_Options} from "../../../utils/TMBDOptions";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";
import {SINGLE_ACTOR} from "../../../utils/const";

interface MovieActorsProps {
    movie_id: string;
}

interface ActorToolTipProps {
    actor: IActor
}

const ActorToolTip: FC<ActorToolTipProps> = ({actor}) => {
    const navigate = useNavigate();
    const baseImageUrl = 'https://www.themoviedb.org/t/p/w500';




    const profileImage = actor.profile_path
        ? `${baseImageUrl}${actor.profile_path}`
        : 'https://via.placeholder.com/150'; // fallback image

    return (
        <Row gutter={[16, 16]} style={{padding: 4}}>
            <Col >
                <Avatar
                    size={{xs: 64, sm: 64, md: 64, lg: 64, xl: 64, xxl: 64}}
                    src={profileImage}
                    alt={actor.name || 'Actor'}
                >
                    {actor.name ? actor.name.charAt(0) : 'U'} {/* Fallback letter */}
                </Avatar>
            </Col>
            <Col>
                <Progress
                    width={64}
                    type="circle"
                    percent={actor.popularity}
                    format={(percent) => `${percent?.toFixed(1)} Stars`}
                />
            </Col>
            <Col>
                <Button
                    onClick={() => navigate(`${SINGLE_ACTOR}?id=${actor.id}`)}
                >
                    Open
                </Button>
            </Col>
        </Row>
    );
};

const MovieActors: FC<MovieActorsProps> = ({movie_id}) => {
    const id = movie_id.toString();
    const {actors, loading, error} = useMovieActors(id)

    if (loading) {
        return <Skeleton/>
    }

    if (error) {
        return <Alert showIcon={true} message={error} type="error"/>
    }

    return (
        <>
            {actors.map(actor => {
                if (actor.popularity > 10) {
                    return (
                        <Tag style={{
                            cursor: "pointer",
                            marginBottom: 4,
                            backgroundColor: actor.gender === 1 ? "rgba(195,0,255,0.25)" : "rgba(0,54,255,0.25)"
                        }} key={actor.id}>
                            <Tooltip color={"rgba(255,255,255,1)"} title={<ActorToolTip actor={actor}/>}>
                                <span>{actor.name}</span>
                            </Tooltip>
                        </Tag>
                    )
                }
                return null
            })}
        </>
    );
};

export default MovieActors;