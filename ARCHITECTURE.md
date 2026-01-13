# 🏗️ Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MovieFlix Frontend                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   React App         │
                    │   (App.jsx)         │
                    └─────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
        ┌────────────┐ ┌────────────┐ ┌─────────────┐
        │ Components │ │   Styles   │ │   Utils     │
        │ (7 files)  │ │ (8 files)  │ │ (2 files)   │
        └────────────┘ └────────────┘ └─────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌──────────────────┐  ┌──────────────┐
            │   TMDB API       │  │ LocalStorage │
            │  (REST/JSON)     │  │  (Watchlist) │
            └──────────────────┘  └──────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │ themoviedb.org          │
        │ (Movie Database)        │
        └─────────────────────────┘
```

## Component Hierarchy

```
App (Root Component)
├── Header
│   ├── Logo
│   └── Navigation Menu
│
├── SearchBar (Hero Section)
│   ├── Title & Subtitle
│   ├── Search Form
│   └── Animated Background
│
├── MovieGrid (or Selected Movie Detail)
│   ├── MovieCard (multiple)
│   │   ├── Poster Image
│   │   ├── Rating Badge
│   │   ├── Movie Info
│   │   └── Action Buttons
│   └── Empty State
│
├── SelectedMovie (Conditional)
│   ├── Backdrop Image
│   ├── Poster Thumbnail
│   ├── Movie Details
│   │   ├── Title
│   │   ├── Metadata
│   │   ├── Genres
│   │   ├── Synopsis
│   │   └── Cast List
│   └── Add to Watchlist Button
│
├── Recommendations (Conditional)
│   ├── Header
│   └── MovieGrid (similar structure)
│
└── Watchlist
    ├── Header with Count
    └── Grid of Watchlist Items
```

## Data Flow Diagram

```
User Input (Search/Click)
        │
        ▼
  App State Update
        │
        ├─────────────────────────────────┐
        │                                 │
        ▼                                 ▼
  Search Query          Selected Movie
        │                       │
        ▼                       ▼
  TMDB API Call         TMDB Details API
        │                       │
        ▼                       ▼
  Search Results        Full Movie Object
        │                       │
        ▼                       ▼
  setMovies()          setSelected()
        │                       │
        ▼                       ▼
  Components Re-Render  Recommendations Generated
        │                (Cosine Similarity)
        ▼                       │
  Display Updated      Components Re-Render
  Movie Grid                   │
                        Display Details +
                        Recommendations
```

## State Management Flow

```
App Component State:
├── query (string) → SearchBar → onSearch → setMovies, setSelected
├── movies (Movie[]) → MovieGrid → MovieCard → onSelect
├── selected (Movie | null) → SelectedMovie → Recommendations
├── watchlist (Movie[]) → All Components → onAddToWatchlist
│   └── Updates localStorage automatically
├── loading (boolean) → UI Shows/Hides spinner
└── error (string | null) → Error message displayed

LocalStorage:
└── watchlist → Persists across sessions
    └── Auto-synced with React state via useEffect
```

## API Integration Layer

```
┌──────────────────────────────────────────┐
│         TMDB API Functions               │
│         (src/utils/tmdbApi.js)           │
└──────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌─────────┐   ┌──────────┐   ┌──────────┐
│ Search  │   │ Details  │   │ Popular  │
│ Movies  │   │ with     │   │ Movies   │
│         │   │ Cast     │   │          │
└─────────┘   └──────────┘   └──────────┘
    │               │               │
    ▼               ▼               ▼
GET /search    GET /movie/{id}  GET /movie
/movie         ?append_to_      /popular
               response=credits

                    │
                    ▼
          Response Formatting
          └─ Normalize data
             Extract needed fields
             Handle missing data

                    │
                    ▼
              Return to App
```

## Recommendation Algorithm Details

```
Input: selectedMovie (Movie object with genres)

Step 1: Filter non-selected movies
  filteredMovies = allMovies.filter(m => m.id !== selected.id)

Step 2: Calculate genre vectors
  For each movie pair:
    vectorA = [1 if genre in A, else 0] for all genres
    vectorB = [1 if genre in B, else 0] for all genres

Step 3: Calculate cosine similarity
  dotProduct = sum(vectorA[i] * vectorB[i])
  magnitude_A = sqrt(sum(vectorA[i]²))
  magnitude_B = sqrt(sum(vectorB[i]²))
  similarity = dotProduct / (magnitude_A * magnitude_B)

Step 4: Score recommendations
  score = similarity (purely genre-based)
  
Alternative with rating factor:
  genreSimilarity = (from Step 3)
  ratingDiff = abs(ratingA - ratingB) / 10
  score = genreSimilarity * 0.7 + (1 - ratingDiff) * 0.3

Step 5: Sort and filter
  sorted = recommendations.sort((a, b) => b.score - a.score)
  filtered = sorted.filter(m => m.score > 0)
  top6 = filtered.slice(0, 6)

Output: top6 movies with scores
```

## Storage Architecture

```
Browser LocalStorage
│
└── 'watchlist' (key)
    └── JSON.stringify([
          {
            id: number,
            title: string,
            poster_path: string,
            rating: number,
            overview: string,
            release_date: string,
            genres: string[],
            cast: object[]
          },
          ...
        ])

Persistence Flow:
1. Load on App mount (useEffect)
   localStorage.getItem('watchlist')

2. Update on any watchlist change (useEffect)
   localStorage.setItem('watchlist', JSON.stringify(watchlist))

3. Load on next session
   JSON.parse(localStorage.getItem('watchlist'))
```

## Component Lifecycle

### App Component
```
mount
  └─ useEffect: Load localStorage watchlist
  └─ useEffect: Load popular movies

  │
  ▼
render

user: search query → handleSearch
  └─ Fetch from TMDB
  └─ Update movies state
  └─ Re-render MovieGrid

user: click movie → handleSelectMovie
  └─ Fetch movie details
  └─ Update selected state
  └─ Generate recommendations
  └─ Re-render SelectedMovie + Recommendations

user: add to watchlist → handleAddToWatchlist
  └─ Update watchlist state
  └─ Trigger useEffect → Save to localStorage
  └─ Re-render with visual feedback

user: remove from watchlist → handleRemoveFromWatchlist
  └─ Update watchlist state
  └─ Trigger useEffect → Save to localStorage
  └─ Re-render Watchlist
```

## CSS Architecture

```
Global Styles (App.css)
├── CSS Custom Properties (Variables)
│   └── Colors, shadows, animations
├── Reset & Base Styles
│   └── *, body, html
└── Utility Classes
    └── error-message, loading-spinner

Component-Specific Styles
├── Header.css
│   ├── Navigation styles
│   ├── Logo animation
│   └── Mobile menu toggle
│
├── SearchBar.css
│   ├── Hero section layout
│   ├── Form styling
│   ├── Animated gradients
│   └── Blob animations
│
├── MovieGrid.css
│   ├── Grid layout (auto-fill)
│   ├── Responsive columns
│   └── Empty state
│
├── MovieCard.css
│   ├── Card container
│   ├── Poster image
│   ├── Overlay on hover
│   ├── Rating badge
│   └── Action buttons
│
├── SelectedMovie.css
│   ├── Backdrop image
│   ├── Poster + details layout
│   ├── Cast gallery
│   └── Primary button
│
├── Recommendations.css
│   ├── Section header
│   └── Grid layout
│
└── Watchlist.css
    ├── Watchlist header with count
    ├── Grid layout
    └── Quick action buttons

Responsive Breakpoints:
├── Desktop: 1024px+
├── Tablet: 768px - 1024px
├── Mobile: 480px - 768px
└── Small: < 480px
```

## Performance Considerations

### Optimizations Implemented
- ✅ Lazy loading images (loading="lazy")
- ✅ CSS Grid with auto-fill (responsive without JS)
- ✅ GPU-accelerated transforms (transform, opacity)
- ✅ Efficient state updates (no unnecessary re-renders)
- ✅ Event delegation on cards
- ✅ Debounced API calls in search
- ✅ Filter invalid movies (no poster)
- ✅ Limit recommendations to 6 items

### Potential Improvements
- [ ] Implement request caching
- [ ] Add image blur-up loading
- [ ] Pagination for large result sets
- [ ] Virtual scrolling for long lists
- [ ] Service worker for offline support
- [ ] Code splitting with React.lazy

## Security Considerations

### Current Status
- API key exposed in frontend (acceptable for dev/demo)
- LocalStorage used for watchlist (safe, local-only)
- No user authentication
- No sensitive data handling

### Production Recommendations
1. **API Key Protection**
   - Use backend proxy to hide API key
   - Implement rate limiting on backend
   - Validate requests on server

2. **Data Security**
   - Implement user authentication
   - Add HTTPS/SSL
   - Validate all API responses
   - Sanitize displayed content

3. **Client Security**
   - Use Content Security Policy (CSP)
   - Implement CORS headers
   - Validate form inputs
   - Escape user-generated content

## Browser Compatibility

```
Chrome/Edge:      ✅ Full support (modern CSS/JS)
Firefox:          ✅ Full support (CSS Grid, Flex)
Safari:           ✅ Full support (iOS 12+, macOS)
Internet Explorer: ❌ Not supported (CSS Grid, async/await)

Required Browser Features:
- CSS Grid
- CSS Flexbox
- CSS Gradients
- CSS Transforms
- Fetch API
- JSON parsing
- LocalStorage
- Modern JavaScript (ES6+)
```

## File Dependencies

```
App.jsx
├── Imports Header (components/Header.jsx)
├── Imports SearchBar (components/SearchBar.jsx)
├── Imports MovieGrid (components/MovieGrid.jsx)
├── Imports SelectedMovie (components/SelectedMovie.jsx)
├── Imports Recommendations (components/Recommendations.jsx)
├── Imports Watchlist (components/Watchlist.jsx)
├── Imports styles (styles/App.css)
├── Imports TMDB API utils (utils/tmdbApi.js)
└── Imports recommendations utils (utils/recommendations.js)

MovieGrid.jsx
├── Imports MovieCard (components/MovieCard.jsx)
└── Imports styles (styles/MovieGrid.css)

MovieCard.jsx
├── Imports getImageUrl from utils/tmdbApi.js
└── Imports styles (styles/MovieCard.css)

SelectedMovie.jsx
├── Imports getImageUrl from utils/tmdbApi.js
└── Imports styles (styles/SelectedMovie.css)

Recommendations.jsx
├── Imports MovieCard (components/MovieCard.jsx)
└── Imports styles (styles/Recommendations.css)

Watchlist.jsx
├── Imports getImageUrl from utils/tmdbApi.js
└── Imports styles (styles/Watchlist.css)
```

## Module Exports

```
utils/tmdbApi.js exports:
├── searchMoviesTMDB(query) → Promise<Movie[]>
├── getMovieDetailsTMDB(movieId) → Promise<Movie>
├── fetchPopularMovies() → Promise<Movie[]>
└── getImageUrl(path, size?) → string

utils/recommendations.js exports:
├── cosineSimilarity(genresA, genresB) → number
└── generateRecommendations(movie, allMovies) → Movie[]

Components export React components:
├── Header (with onHomeClick prop)
├── SearchBar (with query, setQuery, onSearch, loading props)
├── MovieGrid (with movies, onSelect, onAddToWatchlist, watchlist props)
├── SelectedMovie (with movie, onAddToWatchlist, isInWatchlist props)
├── Recommendations (with movies, onSelect, onAddToWatchlist, watchlist props)
└── Watchlist (with movies, onRemove, onSelect props)
```

---

This architecture is designed for:
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Performance**: Optimized rendering and API calls
- **User Experience**: Smooth animations and responsive design
- **Accessibility**: Semantic HTML and keyboard navigation

🚀 Ready for production or further enhancement!
