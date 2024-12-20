
export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMovieResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    total_pages: number;
    total_result: number;
    results: IMovie[];
}

interface IGenre {
    id: number;
    name: string;
}

interface IProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface ISpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IMovieFull {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | Record<string, any>; // Укажите точную структуру, если известна
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

