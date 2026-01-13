import { getImageUrl } from '../utils/tmdbApi';
import '../styles/SelectedMovie.css';

function SelectedMovie({ movie, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist }) {
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const backdropUrl = getImageUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <section className="selected-movie-section">
      <div
        className="backdrop-image"
        style={{
          backgroundImage: `url(${backdropUrl})`
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="selected-movie-content">
        <div className="movie-poster-large">
          <img src={posterUrl} alt={movie.title} />
        </div>

        <div className="movie-details">
          <h1 className="movie-title-large">{movie.title}</h1>
          <div className="movie-meta">
            <span className="meta-item">
              <span className="meta-label">Year:</span> {year}
            </span>
            <span className="meta-item">
              <span className="meta-label">Rating:</span> {rating}/10 ⭐
            </span>
            {movie.runtime && (
              <span className="meta-item">
                <span className="meta-label">Runtime:</span> {movie.runtime} min
              </span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="genre-tags">
              {movie.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="movie-synopsis">
            <h3>Synopsis</h3>
            <p>{movie.overview || 'No synopsis available.'}</p>
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div className="cast-section">
              <h3>Cast</h3>
              <div className="cast-list">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="cast-member">
                    {actor.profile_path && (
                      <img
                        src={getImageUrl(actor.profile_path)}
                        alt={actor.name}
                        className="actor-image"
                      />
                    )}
                    <div className="actor-info">
                      <p className="actor-name">{actor.name}</p>
                      <p className="character-name">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isInWatchlist ? (
            <button
              className="btn-primary"
              onClick={() => onAddToWatchlist(movie)}
            >
              + Add to Watchlist
            </button>
          ) : (
            <button
              className="btn-primary active"
              onClick={() => onRemoveFromWatchlist(movie.id)}
            >
              ✓ Remove from Watchlist
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default SelectedMovie;
