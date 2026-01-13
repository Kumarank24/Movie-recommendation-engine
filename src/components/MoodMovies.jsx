import '../styles/MoodMovies.css';
import MovieGrid from './MovieGrid';

function MoodMovies({ movies, selectedMood, onSelect, onAddToWatchlist, onRemoveFromWatchlist, watchlist }) {
  if (!selectedMood) {
    return (
      <section className="mood-movies-section">
        <div className="mood-empty-state">
          <p>Select a mood above to discover personalized movie recommendations!</p>
        </div>
      </section>
    );
  }

  const moodTitles = {
    happy: '😊 Happy Movies',
    sad: '😢 Emotional Dramas',
    excited: '🤩 Action-Packed Films',
    scared: '😨 Thrilling Scares',
    romantic: '💕 Romantic Tales',
    curious: '🤔 Mystery & Thriller',
    relaxed: '😌 Relaxing Dramas'
  };

  return (
    <section className="mood-movies-section">
      <div className="mood-movies-header">
        <h2>{moodTitles[selectedMood]}</h2>
        <p>Movies for your current mood</p>
      </div>
      
      {movies.length === 0 ? (
        <div className="mood-empty-state">
          <p>No movies found for this mood and language combination. Try a different selection!</p>
        </div>
      ) : (
        <MovieGrid
          movies={movies}
          onSelect={onSelect}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          watchlist={watchlist}
        />
      )}
    </section>
  );
}

export default MoodMovies;
