import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import SelectedMovie from './components/SelectedMovie';
import Recommendations from './components/Recommendations';
import Watchlist from './components/Watchlist';

// Dummy movie data (frontend only)
const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    rating: 8.8,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    poster: 'https://via.placeholder.com/300x450?text=Inception',
    overview:
      'A thief who steals corporate secrets through dream-sharing technology is given a chance at redemption.'
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    rating: 8.6,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    poster: 'https://via.placeholder.com/300x450?text=Interstellar',
    overview:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    genres: ['Action', 'Crime', 'Drama'],
    poster: 'https://via.placeholder.com/300x450?text=Dark+Knight',
    overview:
      'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.'
  },
  {
    id: 4,
    title: 'Tenet',
    year: 2020,
    rating: 7.4,
    genres: ['Sci-Fi', 'Action'],
    poster: 'https://via.placeholder.com/300x450?text=Tenet',
    overview:
      'An operative manipulates the flow of time to prevent a global catastrophe.'
  }
];

// simple cosine on genres (string-based)
const cosineSimilarity = (genresA, genresB) => {
  const setA = new Set(genresA);
  const setB = new Set(genresB);
  const all = new Set([...genresA, ...genresB]);

  const vA = Array.from(all).map((g) => (setA.has(g) ? 1 : 0));
  const vB = Array.from(all).map((g) => (setB.has(g) ? 1 : 0));

  const dot = vA.reduce((sum, x, i) => sum + x * vB[i], 0);
  const magA = Math.sqrt(vA.reduce((sum, x) => sum + x * x, 0));
  const magB = Math.sqrt(vB.reduce((sum, x) => sum + x * x, 0));

  if (!magA || !magB) return 0;
  return dot / (magA * magB);
};

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(DUMMY_MOVIES);
  const [selected, setSelected] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  // Filter dummy list locally
  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      setMovies(DUMMY_MOVIES);
      setSelected(null);
      return;
    }
    const filtered = DUMMY_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(q)
    );
    setMovies(filtered);
    setSelected(null);
  };

  const handleSelectMovie = (movie) => {
    setSelected(movie);
  };

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // recommendations based on cosine over dummy genres
  const recommendations =
    selected == null
      ? []
      : DUMMY_MOVIES.filter((m) => m.id !== selected.id)
          .map((m) => ({
            ...m,
            score: cosineSimilarity(selected.genres, m.genres)
          }))
          .sort((a, b) => b.score - a.score)
          .filter((m) => m.score > 0);

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />

        {selected && <SelectedMovie movie={selected} />}

        <section className="section">
          <h2>{selected ? 'Search results' : 'Popular movies'}</h2>
          <MovieGrid
            movies={movies}
            onSelect={handleSelectMovie}
            onAddToWatchlist={handleAddToWatchlist}
            watchlist={watchlist}
          />
        </section>

        {recommendations.length > 0 && (
          <Recommendations
            movies={recommendations}
            onSelect={handleSelectMovie}
            onAddToWatchlist={handleAddToWatchlist}
            watchlist={watchlist}
          />
        )}

        <Watchlist
          movies={watchlist}
          onRemove={handleRemoveFromWatchlist}
        />
      </main>
    </div>
  );
}

export default App;
