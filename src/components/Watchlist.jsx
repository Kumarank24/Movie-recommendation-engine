import '../styles/Watchlist.css';
import { getImageUrl } from '../utils/tmdbApi';

function Watchlist({ movies, onRemove, onSelect }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="watchlist-section">
      <div className="watchlist-header">
        <h2>📌 My Watchlist</h2>
        <span className="watchlist-count">{movies.length} movies</span>
      </div>

      <div className="watchlist-container">
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <div className="watchlist-poster-container">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="watchlist-poster"
                  onClick={() => onSelect?.(movie)}
                />
                <div className="watchlist-overlay">
                  <button
                    className="btn-view"
                    onClick={() => onSelect?.(movie)}
                  >
                    View
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => onRemove(movie.id)}
                    title="Remove from watchlist"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="watchlist-info">
                <h4 className="watchlist-title">{movie.title}</h4>
                <p className="watchlist-rating">
                  ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}/10
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Watchlist;
