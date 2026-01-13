# 🚀 Quick Start Guide

## Step 1: Get Your TMDB API Key (2 minutes)

1. Go to: https://www.themoviedb.org/settings/api
2. Create a free account or log in
3. Click on "API" in the left sidebar
4. Accept the terms and request an API key
5. Copy your API key

## Step 2: Configure the Project (1 minute)

1. Open the file: `src/utils/tmdbApi.js`
2. Find this line at the top:
   ```javascript
   const API_KEY = 'YOUR_TMDB_API_KEY';
   ```
3. Replace it with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here_for_example_abc123def456';
   ```
4. Save the file

## Step 3: Install & Run (3 minutes)

```bash
# Navigate to project folder
cd "Movie Recommendation Engine"

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

The app will automatically open at http://localhost:3000

## Step 4: Start Using the App! 🎉

### Search for Movies
- Type a movie title in the search bar
- Click "Search" to find it

### View Movie Details
- Click "View Details" on any movie
- See full information, cast, ratings, and synopsis

### Get Recommendations
- After selecting a movie, scroll down to "Recommended For You"
- These are based on genre similarity

### Save to Watchlist
- Click "+ Watchlist" on any movie
- Your watchlist is saved automatically
- View all saved movies at the bottom of the page

## Common Issues & Solutions

### "Invalid API Key" Error
- Double-check that you copied the API key correctly
- Make sure there are no extra spaces

### No Results Appearing
- Check your internet connection
- Verify TMDB API is working by testing at https://www.themoviedb.org/

### Port 3000 Already in Use
- Run: `npm start -- --port 3001`

### Want to Stop the Server?
- Press `Ctrl + C` in the terminal

## Next Steps

- Explore different movie genres
- Try searching for your favorite movies
- Build your watchlist
- Share movies with recommendations

---

**Need help?** Check the full README.md file for more details!
