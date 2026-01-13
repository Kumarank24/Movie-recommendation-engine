# API Configuration & Integration Guide

## TMDB API Overview

MovieFlix uses The Movie Database (TMDB) API v3 for all movie data.

**API Documentation**: https://developers.themoviedb.org/3

## Getting Your API Key

### Step-by-Step Instructions

1. **Visit TMDB Website**
   - Go to: https://www.themoviedb.org/settings/api

2. **Create Account (if needed)**
   - Click "Join TMDB"
   - Fill in your details
   - Verify your email

3. **Request API Access**
   - Go to Settings → API
   - Click the blue request button
   - Fill in the application details:
     - **Application Name**: MovieFlix Movie Recommendation Engine
     - **Application URL**: http://localhost:3000 (for development)
     - **Application Type**: Website
     - **Application Description**: A movie search and recommendation system
   - Accept the terms and submit

4. **Get Your Key**
   - You'll receive your API key immediately
   - Copy the API Key (v3 auth) from the page

## Configuration

### Option 1: Direct Configuration (Development)

Edit `src/utils/tmdbApi.js`:

```javascript
const API_KEY = 'your_api_key_here';
```

### Option 2: Environment Variables (Recommended)

Create `.env` file in root directory:

```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

Then in `src/utils/tmdbApi.js`:

```javascript
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
```

## API Endpoints Used

The application uses these TMDB API endpoints:

### 1. Search Movies
```
GET /search/movie?api_key={key}&query={query}
```
Returns search results for a movie title.

**Example Response:**
```json
{
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "overview": "An insomniac office worker...",
      "release_date": "1999-10-15",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "vote_average": 8.8
    }
  ]
}
```

### 2. Get Movie Details
```
GET /movie/{movie_id}?api_key={key}&append_to_response=credits
```
Returns detailed information including cast.

**Response Includes:**
- `title`, `overview`
- `poster_path`, `backdrop_path`
- `vote_average`, `release_date`
- `runtime`, `budget`, `revenue`
- `genres` (array)
- `credits.cast` (actor information)

### 3. Popular Movies
```
GET /movie/popular?api_key={key}&page=1
```
Returns trending/popular movies.

## Response Data Structure

### Movie Object
```javascript
{
  id: number,                    // Unique identifier
  title: string,                 // Movie title
  overview: string,              // Plot synopsis
  poster_path: string,           // Path to poster image
  backdrop_path: string,         // Path to backdrop image
  vote_average: number,          // Rating (0-10)
  vote_count: number,            // Number of votes
  release_date: string,          // ISO date (YYYY-MM-DD)
  genres: [
    { id: number, name: string }
  ],
  runtime: number,               // Minutes
  budget: number,                // In USD
  revenue: number,               // In USD
  credits: {
    cast: [
      {
        id: number,
        name: string,
        character: string,
        profile_path: string
      }
    ]
  }
}
```

## Image Handling

TMDB API returns relative image paths. To display images:

```javascript
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
```

### Available Sizes
- `w92` - Small (92px)
- `w154` - Small-Medium (154px)
- `w185` - Medium (185px)
- `w342` - Medium-Large (342px)
- `w500` - Large (500px) - **Used in this app**
- `w780` - Extra Large (780px)
- `original` - Original resolution

## Error Handling

### Common Errors

**401 Unauthorized**
- Invalid or missing API key
- API key expired or inactive
- Check TMDB website settings

**404 Not Found**
- Movie doesn't exist
- Invalid movie ID

**429 Too Many Requests**
- Rate limit exceeded
- Wait before making new requests
- TMDB limits: 40 requests per 10 seconds

**500 Internal Server Error**
- TMDB server issue
- Try again later

### Error Handling in App

The app includes error handling:

```javascript
try {
  const results = await searchMoviesTMDB(query);
  setMovies(results);
} catch (err) {
  setError('Failed to search movies');
  console.error(err);
}
```

## Rate Limiting

TMDB API rate limits:
- **Free Account**: 40 requests per 10 seconds
- **Premium**: Higher limits

Tips to stay under limits:
- Implement debouncing on search input
- Cache results locally
- Use proper pagination
- Avoid duplicate requests

## Data Transformation

The app transforms TMDB responses for internal use:

```javascript
const formatMovieData = (tmdbMovie) => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  overview: tmdbMovie.overview,
  poster_path: tmdbMovie.poster_path,
  backdrop_path: tmdbMovie.backdrop_path,
  rating: tmdbMovie.vote_average,
  vote_count: tmdbMovie.vote_count,
  release_date: tmdbMovie.release_date,
  genres: tmdbMovie.genres.map(g => g.name),
  cast: tmdbMovie.credits.cast.slice(0, 5).map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path
  })),
  runtime: tmdbMovie.runtime,
  budget: tmdbMovie.budget,
  revenue: tmdbMovie.revenue
});
```

## API Functions Reference

### searchMoviesTMDB(query)
Searches for movies by title.

```javascript
const results = await searchMoviesTMDB('Inception');
// Returns array of movie objects
```

### getMovieDetailsTMDB(movieId)
Gets detailed info including cast.

```javascript
const details = await getMovieDetailsTMDB(550);
// Returns formatted movie object
```

### fetchPopularMovies()
Gets current popular movies.

```javascript
const popular = await fetchPopularMovies();
// Returns array of movie objects
```

### getImageUrl(path, size)
Constructs image URL from TMDB path.

```javascript
const url = getImageUrl(movie.poster_path);
// Returns full image URL
```

## Testing the API

### Using curl (Command Line)

```bash
curl "https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=Inception"
```

### Using Postman

1. Create new GET request
2. URL: `https://api.themoviedb.org/3/search/movie`
3. Params:
   - `api_key`: Your API key
   - `query`: Movie title
4. Send request

### Browser Test

Visit directly (replace YOUR_KEY):
```
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=Inception
```

## Troubleshooting API Issues

### Issue: "Invalid API Key"
- Check key is copied correctly (no extra spaces)
- Verify key is active on TMDB website
- Try generating a new key

### Issue: No results
- Spelling check on search query
- Use English movie titles
- Try a more specific search

### Issue: Images not loading
- Verify image path exists
- Check image URL construction
- Ensure TMDB image CDN is accessible

### Issue: Rate limiting
- Reduce request frequency
- Implement request caching
- Use pagination for multiple results

## Production Considerations

### Security
- **Never expose API key in client-side code for production**
- Use a backend proxy server
- Implement authentication/authorization

### Performance
- Implement caching strategy
- Use pagination
- Minimize API calls

### Scalability
- Consider database for caching popular searches
- Implement request queuing
- Monitor API usage

## Resources

- **TMDB API Docs**: https://developers.themoviedb.org/3
- **API Playground**: https://www.themoviedb.org/talk/5571756c9251410c6500012d
- **Status Page**: https://status.themoviedb.org/
- **Support Forum**: https://www.themoviedb.org/talk

---

Need help? Check the QUICKSTART.md or README.md files!
