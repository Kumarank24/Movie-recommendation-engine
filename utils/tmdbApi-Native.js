// TMDB API Configuration for React Native
const API_KEY = '45c0e669336d34c17afec6176cd5e74e';
const BASE_URL = 'https://api.themoviedb.org/3';

// Genre ID mapping
const GENRE_MAPPING = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// Language code mapping
const LANGUAGE_CODES = {
  'en': 'en-US',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'de': 'de-DE',
  'ja': 'ja-JP',
  'ko': 'ko-KR',
  'ru': 'ru-RU',
  'pt': 'pt-BR',
  'it': 'it-IT',
  'zh': 'zh-CN',
};

/**
 * Search movies by title
 */
export async function searchMoviesTMDB(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

/**
 * Get movie details with cast information
 */
export async function getMovieDetailsTMDB(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

/**
 * Fetch popular/trending movies
 */
export async function fetchPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

/**
 * Discover movies by genres and language
 */
export async function discoverMoviesByGenres(genres, language = 'en') {
  try {
    const genreString = genres.join(',');
    const langCode = LANGUAGE_CODES[language] || 'en-US';

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreString}&language=${langCode}&sort_by=popularity.desc&page=1`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error discovering movies:', error);
    throw error;
  }
}

/**
 * Get image URL for movie posters and backdrops
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Get genre name by ID
 */
export function getGenreName(genreId) {
  return GENRE_MAPPING[genreId] || 'Unknown';
}