import { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import SelectedMovie from './components/SelectedMovie';
import Recommendations from './components/Recommendations';
import Watchlist from './components/Watchlist';
import MoodSelector from './components/MoodSelector';
import LanguageSelector from './components/LanguageSelector';
import MoodMovies from './components/MoodMovies';
import { searchMoviesTMDB, getMovieDetailsTMDB, fetchPopularMovies, discoverMoviesByGenres } from './utils/tmdbApi';
import { cosineSimilarity } from './utils/recommendations';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [moodMovies, setMoodMovies] = useState([]);

  const moodGenres = {
    happy: ['Comedy', 'Animation', 'Family'],
    sad: ['Drama'],
    excited: ['Action', 'Adventure', 'Sci-Fi'],
    scared: ['Horror', 'Thriller'],
    romantic: ['Romance'],
    curious: ['Mystery', 'Crime', 'Thriller'],
    relaxed: ['Drama', 'Documentary']
  };

  useEffect(() => {
    if (currentPage === 'home' || currentPage === 'trending') {
      loadPopularMovies();
    }
  }, [currentPage]);

  useEffect(() => {
    if (selectedMood) {
      loadMoodMovies();
    }
  }, [selectedMood, selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load popular movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoodMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const genres = moodGenres[selectedMood] || [];
      const data = await discoverMoviesByGenres(genres, selectedLanguage);
      setMoodMovies(data);
    } catch (err) {
      console.error('Error loading mood movies:', err);
      setMoodMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      await loadPopularMovies();
      setSelected(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchMoviesTMDB(q);
      setMovies(results);
      setSelected(null);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (movie) => {
    try {
      setLoading(true);
      setError(null);
      const details = await getMovieDetailsTMDB(movie.id);
      setSelected(details);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
      setSelected(movie);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const recommendations = selected
    ? movies
        .filter((m) => m.id !== selected.id)
        .map((m) => ({
          ...m,
          score: cosineSimilarity(selected.genres || [], m.genres || [])
        }))
        .sort((a, b) => b.score - a.score)
        .filter((m) => m.score > 0)
        .slice(0, 6)
    : [];

  return (
    <div className="App">
      <Header 
        onHomeClick={() => {
          setCurrentPage('home');
          setSelected(null);
        }}
        onWatchlistClick={() => setCurrentPage('watchlist')}
        onTrendingClick={() => setCurrentPage('trending')}
        currentPage={currentPage}
      />
      <main className="app-main">
        {currentPage === 'home' && (
          <>
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              loading={loading}
            />

            {error && <div className="error-message">{error}</div>}

            {selected && (
              <SelectedMovie 
                movie={selected} 
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                isInWatchlist={watchlist.some((m) => m.id === selected.id)}
              />
            )}

            {!selected && (
              <>
                <section className="section popular-section">
                  <h2>Popular Movies</h2>
                  {loading ? (
                    <div className="loading-spinner">Loading...</div>
                  ) : (
                    <MovieGrid
                      movies={movies}
                      onSelect={handleSelectMovie}
                      onAddToWatchlist={handleAddToWatchlist}
                      onRemoveFromWatchlist={handleRemoveFromWatchlist}
                      watchlist={watchlist}
                    />
                  )}
                </section>

                <MoodSelector 
                  selectedMood={selectedMood}
                  onMoodSelect={setSelectedMood}
                />

                <div className="mood-filters">
                  <LanguageSelector 
                    selectedLanguage={selectedLanguage}
                    onLanguageSelect={setSelectedLanguage}
                  />
                </div>

                <MoodMovies
                  movies={moodMovies}
                  selectedMood={selectedMood}
                  onSelect={handleSelectMovie}
                  onAddToWatchlist={handleAddToWatchlist}
                  onRemoveFromWatchlist={handleRemoveFromWatchlist}
                  watchlist={watchlist}
                />
              </>
            )}

            {selected && recommendations.length > 0 && (
              <Recommendations
                movies={recommendations}
                onSelect={handleSelectMovie}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
              />
            )}
          </>
        )}

        {currentPage === 'watchlist' && (
          <section className="section watchlist-page">
            <h1 className="page-title">My Watchlist</h1>
            <div className="watchlist-info">
              <p>{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved</p>
            </div>
            {watchlist.length === 0 ? (
              <div className="empty-watchlist">
                <p>Your watchlist is empty</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '20px'
                  }}
                >
                  Explore Movies
                </button>
              </div>
            ) : (
              <Watchlist
                movies={watchlist}
                onRemove={handleRemoveFromWatchlist}
                onSelect={(movie) => {
                  handleSelectMovie(movie);
                  setCurrentPage('home');
                }}
              />
            )}
          </section>
        )}

        {currentPage === 'trending' && (
          <section className="section trending-page">
            <h1 className="page-title">Trending Movies</h1>
            <div className="trending-info">
              <p>Currently trending movies</p>
            </div>
            {loading ? (
              <div className="loading-spinner">Loading trending movies...</div>
            ) : movies.length === 0 ? (
              <div className="empty-message">
                <p>No movies found</p>
              </div>
            ) : (
              <MovieGrid
                movies={movies}
                onSelect={(movie) => {
                  handleSelectMovie(movie);
                  setCurrentPage('home');
                }}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
              />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
