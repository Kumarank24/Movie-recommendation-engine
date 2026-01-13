import { useState } from 'react';
import '../styles/Header.css';

function Header({ onHomeClick, onWatchlistClick, onTrendingClick, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (callback) => {
    callback?.();
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => handleNavClick(onHomeClick)}>
          <div className="logo-icon">🎬</div>
          <h1 className="logo-text">MovieFlix</h1>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick(onHomeClick)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'trending' ? 'active' : ''}`}
            onClick={() => handleNavClick(onTrendingClick)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Trending
          </button>
          <button 
            className={`nav-link ${currentPage === 'watchlist' ? 'active' : ''}`}
            onClick={() => handleNavClick(onWatchlistClick)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Watchlist
          </button>
        </nav>
      </div>

      <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
    </header>
  );
}

export default Header;
