import React, {FC, useEffect, useState} from 'react';
import {IVideoDetails} from "../../../type/Trailer";

interface TrailerProps {
    movie_id: string;
}

const Trailer: FC<TrailerProps> = ({movie_id}) => {

    const [current_trailers, setCurrent_tarilers] = useState<IVideoDetails[]>([]);
    const [trailers_data, setTrailers_data] = useState<IVideoDetails[]>([]);

    useEffect(() => {
        if (movie_id) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTczMTkxNDgxNS43MjM4MzY0LCJzdWIiOiI2NGQ1NzkzN2QxMDBiNjAwYWRhMDAyNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBArssuyWKerLl2OEN_2qM6ITzltfuHDHJjiYQ3ZlOY'
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options)
                .then(res => res.json())
                .then(res => setCurrent_tarilers(res.results))
                .catch(err => console.error(err));
        }
    }, [movie_id]);

    useEffect(() => {
        if (current_trailers.length) {
            const result: IVideoDetails[] = [];
            current_trailers.forEach(trailer => {
                if (trailer.type === "Trailer") {
                    result.push(trailer)
                }
            })
            setTrailers_data(result)
        }
    }, [current_trailers]);

    return (
        <>
            {trailers_data.length &&
            <iframe
                width="100%"
                height="auto"
                style={{minHeight: "300px"}}
                src={`https://www.youtube.com/embed/${trailers_data[0].key}?si=PVe-lLxIU7wmjvRI`}
                title="YouTube video player"
                frameBorder="0"  // Corrected here
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen> // Corrected here
            </iframe>
            }
        </>
    );
};

export default Trailer;