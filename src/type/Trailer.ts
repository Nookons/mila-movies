export interface IVideoDetails {
    iso_639_1: string;  // Language code (e.g., 'en')
    iso_3166_1: string; // Country code (e.g., 'US')
    name: string;       // Name of the video
    key: string;        // YouTube key (e.g., 'FLgpxZp505w')
    site: string;       // Video site (e.g., 'YouTube')
    size: number;       // Video size (resolution)
    type: string;       // Type of the video (e.g., 'Teaser', 'Featurette')
    official: boolean;  // Whether the video is official
    published_at: string; // Publication timestamp
    id: string;         // Video identifier
}

export interface IVideoResponse {
    id: number;        // ID of the response
    results: IVideoDetails[]; // Array of video details
}
