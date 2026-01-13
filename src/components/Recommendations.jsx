import MovieCard from './MovieCard';
import '../styles/Recommendations.css';

function Recommendations({ movies, onSelect, onAddToWatchlist, onRemoveFromWatchlist, watchlist }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="recommendations-section">
      <div className="recommendations-header">
        <h2>Recommended For You</h2>
        <p>Based on genre similarity</p>
      </div>

      <div className="recommendations-grid">
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
    </section>
  );
}

export default Recommendations;
