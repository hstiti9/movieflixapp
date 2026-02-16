const API_KEY = '917ca9698624c72f37cfb1a79dad91b3';
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async (query = '') => {
    const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchMoviesByGenre = async (genreId) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching genre:', error);
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const IMAGE_BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
