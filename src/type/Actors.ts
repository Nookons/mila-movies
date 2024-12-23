export interface IActor {
    adult: boolean;
    gender: number;  // 1 для женщин, 2 для мужчин, 0 для неопределённого
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;  // Путь к изображению профиля или null, если нет
    cast_id: number;
    character: string;  // Роль актера в фильме
    credit_id: string;
    order: number;  // Порядок в списке актеров
}

export interface IMovieCreditsResponse {
    cast: IActor[];
    crew: any[];  // если нужно получить информацию о crew (съемочной группе), добавьте соответствующие поля
}

export interface IActorDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface IProfileImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface IPersonImages {
    id: number;
    profiles: IProfileImage[];
}

export interface IMovie_credits {
    id: number;
    cast: ICast[];
    crew: ICrew[];
}

export interface ICast {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
}

interface ICrew {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    department: string;
    job: string;
}


export interface ITvShow {
    id: number;
    cast: ITvCast[];
    crew: ITvCrew[];
}

export interface ITvCast {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    episode_count: number;
}

export interface ITvCrew {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    department: string;
    job: string;
}

