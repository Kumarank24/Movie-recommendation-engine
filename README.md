# 🎬 MovieFlix - Movie Recommendation Engine

A modern, feature-rich movie search and recommendation system built with React and the TMDB API. Discover movies, explore cast information, and get personalized recommendations based on genre similarity.

## ✨ Features

- **🔍 Movie Search**: Search millions of movies using the TMDB API
- **📊 Detailed Information**: View ratings, cast, synopsis, runtime, and more
- **🤖 Smart Recommendations**: Cosine similarity-based genre recommendations
- **💾 Watchlist Management**: Save movies to your watchlist with local storage persistence
- **🎨 Modern UI Design**: Beautiful, responsive Echo-inspired design
- **⚡ Fast Performance**: Optimized with lazy loading and smooth animations
- **📱 Mobile Responsive**: Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **Frontend**: React 18+
- **API**: The Movie Database (TMDB) API
- **Storage**: Browser LocalStorage
- **Styling**: Modern CSS3 with gradients and animations
- **Recommendations**: Cosine similarity algorithm for ML-based suggestions

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A free TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)

## 🚀 Installation

1. **Clone or navigate to the project directory**:
```bash
cd "Movie Recommendation Engine"
```

2. **Install dependencies**:
```bash
npm install
```

3. **Get Your TMDB API Key**:
   - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Sign up for a free account
   - Generate an API key
   - Copy your API key

4. **Configure API Key**:
   - Open `src/utils/tmdbApi.js`
   - Replace `'YOUR_TMDB_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

5. **Start the development server**:
```bash
npm start
```

6. **Open in browser**:
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to this URL

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation header with responsive menu
│   ├── SearchBar.jsx        # Hero section with search form
│   ├── MovieGrid.jsx        # Grid layout for movie cards
│   ├── MovieCard.jsx        # Individual movie card component
│   ├── SelectedMovie.jsx    # Detailed movie view with cast
│   ├── Recommendations.jsx  # Recommended movies section
│   └── Watchlist.jsx        # User's watchlist section
├── styles/
│   ├── App.css              # Main application styles
│   ├── Header.css           # Header component styles
│   ├── SearchBar.css        # Search bar and hero section styles
│   ├── MovieGrid.css        # Grid layout styles
│   ├── MovieCard.css        # Movie card styles
│   ├── SelectedMovie.css    # Selected movie detail styles
│   ├── Recommendations.css  # Recommendations section styles
│   └── Watchlist.css        # Watchlist section styles
├── utils/
│   ├── tmdbApi.js          # TMDB API integration functions
│   └── recommendations.js   # ML recommendation algorithms
├── App.jsx                  # Main application component
└── index.js                 # React app entry point
```

## 🎯 How to Use

### 1. **Search for Movies**
- Enter a movie title in the search bar on the hero section
- Click "Search" or press Enter
- Browse through the search results

### 2. **View Movie Details**
- Click "View Details" on any movie card
- See full information: ratings, cast, synopsis, runtime, genres
- View actor profiles and character names

### 3. **Get Recommendations**
- After viewing a movie, scroll down to the "Recommended For You" section
- Movies are ranked by genre similarity to your selected movie
- Recommendations are calculated using cosine similarity algorithm

### 4. **Manage Watchlist**
- Click "+ Watchlist" on any movie card or "Add to Watchlist" on details page
- Your watchlist is automatically saved to browser storage
- Access your watchlist at the bottom of the page
- Remove movies by clicking the "✕" button

### 5. **Navigate Home**
- Click the MovieFlix logo to return to popular movies
- Use the navigation menu on mobile devices

## 🧠 Recommendation Algorithm

The app uses **cosine similarity** on genre vectors to recommend similar movies:

```
Similarity Score = (Shared Genres) / √(Total Unique Genres)
```

For example:
- Movie A genres: [Sci-Fi, Action, Thriller]
- Movie B genres: [Sci-Fi, Action, Drama]
- Similarity: 2/√5 ≈ 0.89 (89% similar)

## 💾 Local Storage

Your watchlist is automatically saved to browser localStorage under the key `watchlist`. The data persists between sessions and includes:
- Movie ID
- Title
- Poster image
- Rating
- Overview
- All other movie metadata

## 🎨 Design Features

- **Dark Modern Theme**: Sleek dark blue backgrounds with accent colors
- **Gradient Accents**: Purple, pink, and amber gradient elements
- **Glassmorphism**: Blurred backgrounds and transparency effects
- **Smooth Animations**: Hover effects, transitions, and floating animations
- **Responsive Grid**: Auto-adapting layouts for all screen sizes
- **Interactive Elements**: Hover states, loading indicators, visual feedback

## ⚙️ API Response Caching

Currently, the app fetches data directly from TMDB for each request. For production use, consider implementing:
- Response caching
- Request debouncing
- Pagination for large results

## 🐛 Troubleshooting

### API Key Issues
- **Error: "Invalid API Key"**: Make sure your TMDB API key is correct
- **No results appearing**: Check your internet connection
- **Rate limiting**: TMDB has rate limits; wait a moment before searching again

### LocalStorage Issues
- **Watchlist not saving**: Check if localStorage is enabled in your browser
- **Clear watchlist**: Open DevTools > Application > LocalStorage > Clear "watchlist"

### Display Issues
- **Images not loading**: Verify TMDB image URLs are accessible
- **Responsive issues**: Clear browser cache and reload

## 📊 Performance Tips

- **Lazy Loading**: Images load only when visible
- **Optimized Grid**: CSS Grid with auto-fit for responsive design
- **Event Delegation**: Efficient event handling on card collections
- **CSS Animations**: GPU-accelerated transforms for smooth scrolling

## 🔐 Security Notes

- API key is exposed in the frontend (acceptable for development)
- For production, implement a backend proxy to hide the API key
- Add CORS headers if needed for cross-origin requests

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- IE 11: ❌ Not supported (uses modern CSS/JS features)

## 📝 Future Enhancements

- [ ] User authentication and profiles
- [ ] Advanced filters (year, rating range, language)
- [ ] Movie reviews and ratings from users
- [ ] Share watchlist with friends
- [ ] Trending and top-rated sections
- [ ] Dark/Light mode toggle
- [ ] Movie trailers integration
- [ ] Backend API for data persistence
- [ ] Advanced recommendation algorithms (collaborative filtering)

## 📄 License

This project uses the TMDB API and is for educational purposes.

## 🙏 Credits

- **TMDB API**: [The Movie Database](https://www.themoviedb.org/)
- **Design Inspiration**: Echo Website Hero Header Builder on Dribbble
- **Icons**: Emoji icons from Unicode standard

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review TMDB API documentation
3. Check browser console for error messages
4. Verify your API key configuration

---

**Enjoy discovering movies! 🎬✨**
