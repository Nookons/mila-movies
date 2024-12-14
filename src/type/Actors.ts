
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