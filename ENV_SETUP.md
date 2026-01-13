# Environment Configuration Guide

## Setting Up Environment Variables (Optional)

For better security, you can use environment variables instead of hardcoding the API key.

### Method 1: Create a .env File (Recommended for Development)

1. Create a `.env` file in the root directory (same level as package.json)

2. Add your API key:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

3. Update `src/utils/tmdbApi.js`:

Replace:
```javascript
const API_KEY = 'YOUR_TMDB_API_KEY';
```

With:
```javascript
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY';
```

4. Restart your development server:
```bash
npm start
```

### Important Notes

- **React App Prefix**: React automatically processes environment variables starting with `REACT_APP_`
- **Never commit .env**: Add `.env` to your `.gitignore` file
- **.env.example**: Create a `.env.example` file to show what variables are needed:
```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

### Verifying Environment Variables

You can check if the environment variable is loaded correctly by adding a console log (remove after testing):

```javascript
console.log('API Key loaded:', process.env.REACT_APP_TMDB_API_KEY?.substring(0, 5) + '...');
```

## For Production Deployment

### Best Practice: Backend Proxy

For production, **never expose your API key in frontend code**. Instead:

1. Create a backend API that proxies requests to TMDB
2. Your frontend calls your backend
3. Your backend calls TMDB with the hidden API key

Example flow:
```
Frontend → Your Backend API → TMDB API
```

### Example Backend Setup (Node.js/Express)

```javascript
// backend/api.js
const express = require('express');
const axios = require('axios');
const app = express();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: TMDB_API_KEY,
        query: query
      }
    }
  );
  res.json(response.data);
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

Then update your frontend API calls to use your backend instead of TMDB directly.

## Environment Variables Reference

### Development
- `REACT_APP_TMDB_API_KEY`: Your TMDB API key

### Optional Advanced Setup
- `REACT_APP_API_BASE_URL`: Your backend API URL
- `REACT_APP_ENVIRONMENT`: 'development' or 'production'

## Troubleshooting Environment Variables

### Issue: API key not loading
1. Make sure .env file is in the root directory
2. Check the variable name starts with `REACT_APP_`
3. Restart the development server after creating .env

### Issue: Getting 401 Unauthorized
1. Verify the API key is correct
2. Check TMDB website API settings
3. Make sure the API key is active

### Issue: API key showing in browser
1. Never expose API keys in comments in production code
2. Always use backend proxy for production
3. Consider rotating your API key if exposed

## Security Best Practices

✅ **DO:**
- Use environment variables for sensitive data
- Use backend proxy for production
- Keep .env file in .gitignore
- Rotate API keys periodically
- Use HTTPS in production

❌ **DON'T:**
- Commit .env to version control
- Hardcode API keys (for production)
- Share your API key
- Use development setup in production
- Log API keys in console (except testing)

---

For more information about TMDB API authentication, visit:
https://developers.themoviedb.org/3/getting-started/authentication
