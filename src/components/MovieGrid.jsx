import MovieCard from './MovieCard';
import '../styles/MovieGrid.css';

function MovieGrid({ movies, onSelect, onAddToWatchlist, onRemoveFromWatchlist, watchlist }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>📽️ No movies found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          isInWatchlist={watchlist.some((m) => m.id === movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
