import '../styles/SearchBar.css';

function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2 className="hero-title">Find Your Next Favorite Movie</h2>
        <p className="hero-subtitle">
          Discover movies, explore genres, and get personalized recommendations
        </p>

        <form className="search-form" onSubmit={onSearch}>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner">⌛</span>
              ) : (
                <span>🔍 Search</span>
              )}
            </button>
          </div>
        </form>

        <div className="search-tips">
          <p>💡 Tip: Search for any movie title to get details, cast info, and recommendations</p>
        </div>
      </div>

      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>
    </section>
  );
}

export default SearchBar;
