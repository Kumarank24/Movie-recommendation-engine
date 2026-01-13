// TMDB API Configuration
const API_KEY = '45c0e669336d34c17afec6176cd5e74e'; // Get from https://www.themoviedb.org/settings/api
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const API_CONFIG = {
  key: API_KEY,
  baseURL: BASE_URL,
  imageBaseURL: IMAGE_BASE_URL
};

// Format movie data from TMDB response
const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  poster_path: movie.poster_path,
  backdrop_path: movie.backdrop_path,
  rating: movie.vote_average,
  vote_count: movie.vote_count,
  release_date: movie.release_date,
  genres: movie.genres ? movie.genres.map(g => g.name) : [],
  cast: movie.credits?.cast?.slice(0, 5)?.map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path
  })) || [],
  runtime: movie.runtime,
  budget: movie.budget,
  revenue: movie.revenue,
  original_language: movie.original_language
});

export const searchMoviesTMDB = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
    );
    const data = await response.json();
    return data.results
      .filter(movie => movie.poster_path) // Only movies with posters
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        rating: movie.vote_average,
        release_date: movie.release_date,
        genres: [],
        original_language: movie.original_language
      }));
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetailsTMDB = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
    );
    const data = await response.json();
    return formatMovieData(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1&language=en-US`
    );
    const data = await response.json();
    return data.results
      .filter(movie => movie.poster_path)
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        rating: movie.vote_average,
        release_date: movie.release_date,
        genres: [],
        original_language: movie.original_language
      }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Discover movies by genres
export const discoverMoviesByGenres = async (genres, language = '') => {
  try {
    // Genre IDs mapping
    const genreMap = {
      'Comedy': 35,
      'Animation': 16,
      'Family': 10751,
      'Drama': 18,
      'Action': 28,
      'Adventure': 12,
      'Sci-Fi': 878,
      'Horror': 27,
      'Thriller': 53,
      'Romance': 10749,
      'Mystery': 9648,
      'Crime': 80,
      'Documentary': 99
    };

    const genreIds = genres
      .map(g => genreMap[g])
      .filter(id => id)
      .join(',');

    if (!genreIds) return [];

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&page=1&sort_by=popularity.desc`;
    
    if (language) {
      url += `&with_original_language=${language}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results
      .filter(movie => movie.poster_path)
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        rating: movie.vote_average,
        release_date: movie.release_date,
        genres: [],
        original_language: movie.original_language
      }));
  } catch (error) {
    console.error('Error discovering movies:', error);
    throw error;
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}${path}`;
};
