import { getImageUrl } from '../utils/tmdbApi';
import '../styles/MovieCard.css';

function MovieCard({ movie, onSelect, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist }) {
  const posterUrl = getImageUrl(movie.poster_path);
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-overlay">
          <button
            className="btn-view-details"
            onClick={() => onSelect(movie)}
          >
            View Details
          </button>
          {!isInWatchlist ? (
            <button
              className="btn-watchlist"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(movie);
              }}
              title="Add to watchlist"
            >
              + Watchlist
            </button>
          ) : (
            <button
              className="btn-watchlist active"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFromWatchlist(movie.id);
              }}
              title="Remove from watchlist"
            >
              ✓ Remove
            </button>
          )}
        </div>
        <div className="movie-rating">
          <span className="rating-value">{rating}</span>
          <span className="rating-icon">⭐</span>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{year}</p>
        {movie.overview && (
          <p className="movie-overview">{movie.overview.substring(0, 80)}...</p>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
