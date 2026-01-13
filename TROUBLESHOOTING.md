# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. API Key Issues

#### Problem: "Invalid API Key" Error
**Symptoms**: API returns 401 error, movies won't load

**Solutions**:
1. Verify you copied the API key correctly
   - No extra spaces before/after
   - Copy entire key including special characters
2. Check TMDB website settings
   - Go to https://www.themoviedb.org/settings/api
   - Make sure your API key is listed
   - Verify it's set to "Active"
3. Try generating a new API key
   - In TMDB settings, regenerate the key
   - Update your configuration file
4. Check API key format
   - Should be alphanumeric
   - No special characters except possibly hyphens

#### Problem: "No results" on any search
**Symptoms**: Search works but returns empty

**Solutions**:
1. Check your internet connection
2. Try searching with a different movie title
3. Verify TMDB is up and running
   - Check https://status.themoviedb.org/
4. Check browser console for errors
   - Press F12 → Console tab
   - Look for red error messages

#### Problem: Rate Limiting (429 Error)
**Symptoms**: API calls fail after many searches

**Symptoms**:
- TMDB has rate limits: 40 requests per 10 seconds
- Wait 10 seconds before searching again
- Avoid rapid clicking of buttons
- Close dev tools if open (reduces load)

---

### 2. Installation & Setup Issues

#### Problem: npm install fails
**Symptoms**: Command shows errors or hangs

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules and package-lock.json:
   ```bash
   rm -r node_modules
   rm package-lock.json
   ```
3. Try installing again:
   ```bash
   npm install
   ```
4. Use different registry (if npm is slow):
   ```bash
   npm install --registry https://registry.npmmirror.com
   ```

#### Problem: Port 3000 already in use
**Symptoms**: "Error: listen EADDRINUSE: address already in use :::3000"

**Solutions**:
1. Kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :3000
   kill -9 <PID>
   ```
2. Use a different port:
   ```bash
   npm start -- --port 3001
   ```
3. Wait and try again (process may take time to stop)

#### Problem: Node modules missing after git clone
**Symptoms**: node_modules folder doesn't exist

**Solution**:
```bash
npm install
```

---

### 3. Display & UI Issues

#### Problem: Images not loading
**Symptoms**: Movie posters show as broken images

**Solutions**:
1. Check image URL format:
   - Should be: `https://image.tmdb.org/t/p/w500/path.jpg`
2. Verify TMDB image CDN is accessible
   - Try opening URL in browser directly
3. Clear browser cache:
   - Ctrl+Shift+Delete (Chrome/Firefox)
   - Cmd+Shift+Delete (Safari/Mac)
4. Check for CORS issues:
   - TMDB should allow cross-origin requests
   - Look for CORS errors in console

#### Problem: Styling looks broken
**Symptoms**: Colors are wrong, layout is jumbled

**Solutions**:
1. Hard refresh the browser:
   - Ctrl+F5 (Windows)
   - Cmd+Shift+R (Mac)
2. Clear browser cache:
   - DevTools → Application → Cache → Clear
3. Check for CSS file errors:
   - Open DevTools → Sources
   - Look for CSS files with red errors
4. Verify all CSS files are created:
   - Check src/styles/ folder has all CSS files

#### Problem: Mobile layout doesn't work
**Symptoms**: Layout looks broken on phone/tablet

**Solutions**:
1. Clear viewport meta tag isn't there:
   - Check public/index.html has:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. Test in browser device emulation:
   - DevTools → Toggle device toolbar (Ctrl+Shift+M)
3. Try different screen sizes:
   - Some sizes may have CSS issues
4. Clear cache again:
   - DevTools → Network → "Disable cache"

---

### 4. Functionality Issues

#### Problem: Watchlist won't save
**Symptoms**: Movies don't stay after refresh

**Solutions**:
1. Check localStorage is enabled:
   - DevTools → Application → LocalStorage
   - Look for "watchlist" key
2. Check browser storage limit:
   - Too many saved movies might exceed limit
   - Remove some movies to free space
3. Try clearing and resaving:
   - DevTools → Application → LocalStorage → Clear All
   - Add movies again
4. Check for storage errors in console:
   - Look for QuotaExceededError

#### Problem: Recommendations not showing
**Symptoms**: "Recommended For You" section is empty

**Solutions**:
1. Make sure you've selected a movie:
   - Click "View Details" on any movie
2. Check movie has genres:
   - Some movies may not have genre data from TMDB
3. Check similarity algorithm:
   - Movies must have similarity > 0
   - If selected movie has no genres, no recommendations
4. Try selecting a different movie:
   - Some movies may have incomplete data

#### Problem: Search doesn't work
**Symptoms**: Clicking search button does nothing

**Solutions**:
1. Check API key is configured:
   - Open src/utils/tmdbApi.js
   - Verify API_KEY is set
2. Check search input has text:
   - Make sure you typed in the search box
3. Look for errors in console:
   - DevTools → Console
   - Look for any red errors
4. Try a simple search:
   - Search for "The" or "Movie"
   - Test with known movie titles

#### Problem: Cast information missing
**Symptoms**: No actors shown in movie details

**Solutions**:
1. This is normal for some movies:
   - TMDB may not have cast data for all movies
2. Try with popular movies:
   - Search for "Inception", "Avatar", etc.
3. Check API response:
   - DevTools → Network → search for movie ID
   - Look at response JSON
   - Verify credits.cast has data

---

### 5. Performance Issues

#### Problem: App is slow
**Symptoms**: Lag when scrolling, clicking, or searching

**Solutions**:
1. Close unnecessary browser tabs
2. Clear browser cache:
   - DevTools → Application → Clear Site Data
3. Check for large images:
   - DevTools → Network → Images
   - Look for large file sizes
4. Reduce number of movies loaded:
   - The app loads 20 by default
   - Could reduce to 12-15 for better performance

#### Problem: Loading spinner spins forever
**Symptoms**: Search seems stuck, never completes

**Solutions**:
1. Check API status:
   - Visit https://status.themoviedb.org/
2. Wait for rate limit to reset:
   - Stop searching for 10 seconds
3. Check network tab:
   - DevTools → Network
   - Look for failed requests (red)
4. Reload the page:
   - Sometimes connections get stuck
5. Check API key:
   - Invalid key might cause infinite loading

---

### 6. Browser-Specific Issues

#### Chrome Issues
**Problem**: Console shows warning about localStorage
**Solution**: Normal warning, safe to ignore

**Problem**: Manifest.json missing warning
**Solution**: Optional file, app works without it

#### Firefox Issues
**Problem**: Animations seem choppy
**Solution**: 
- Disable hardware acceleration if needed
- Try Chrome/Edge for comparison

#### Safari Issues
**Problem**: Some CSS features don't work
**Solution**:
- Add -webkit prefixes to CSS
- Update to latest Safari version

---

### 7. Configuration Issues

#### Problem: Environment variables not loading
**Symptoms**: API key is undefined

**Solutions**:
1. Make sure .env file is in root directory:
   - Same level as package.json
   - Not in src/ folder
2. Verify variable name:
   - Must start with REACT_APP_
   - Example: REACT_APP_TMDB_API_KEY
3. Restart dev server:
   ```bash
   npm start
   ```
4. Check .gitignore:
   - Make sure .env is listed

#### Problem: Can't connect to API
**Symptoms**: Network error messages

**Solutions**:
1. Check internet connection:
   - Try browsing other websites
2. Check if TMDB is up:
   - Visit https://www.themoviedb.org/
3. Try using a proxy:
   - Corporate/school network may block API
4. Check firewall settings:
   - May need to whitelist TMDB domain

---

### 8. Debugging Tips

#### Enable Detailed Logging
Add to App.jsx temporarily:
```javascript
useEffect(() => {
  console.log('Search movies:', movies);
  console.log('Selected movie:', selected);
  console.log('Watchlist:', watchlist);
}, [movies, selected, watchlist]);
```

#### Check API Response
In tmdbApi.js, add logging:
```javascript
const response = await fetch(url);
const data = await response.json();
console.log('TMDB Response:', data);
return data;
```

#### Use Browser DevTools
1. Open DevTools: F12 or Ctrl+Shift+I
2. Tabs to check:
   - **Console**: Error messages
   - **Network**: API calls and responses
   - **Application**: LocalStorage and cache
   - **Sources**: Debug code execution
   - **Elements**: Inspect HTML/CSS

---

### 9. Helpful Browser Extensions

- **Redux DevTools**: State debugging
- **React DevTools**: Component inspection
- **Postman**: API testing
- **JSON Formatter**: Pretty JSON responses

---

### 10. Getting Help

If issue persists:

1. **Check console errors** (F12 → Console)
2. **Verify API key** configuration
3. **Test API manually** (Postman or curl)
4. **Clear cache** completely
5. **Try different browser** or device
6. **Check TMDB status** page
7. **Review documentation** files
8. **Restart dev server** and browser

---

## Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Verify/regenerate API key |
| 404 Not Found | Movie doesn't exist | Try different search |
| 429 Too Many Requests | Rate limit exceeded | Wait 10 seconds |
| CORS error | Cross-origin blocked | Use backend proxy |
| QuotaExceededError | Storage full | Clear watchlist |
| Network error | Connection issue | Check internet/firewall |
| TypeError: Cannot read property | Missing data | Check API response |
| Module not found | Missing file | Run npm install |
| Port already in use | Port 3000 taken | Use different port |

---

## Quick Checklist

Before reporting an issue, verify:
- ✅ API key is correctly configured
- ✅ Internet connection is working
- ✅ TMDB website is accessible
- ✅ Browser cache is cleared
- ✅ Dev server is running
- ✅ Console shows no errors
- ✅ Using supported browser
- ✅ Tried hard refresh (Ctrl+F5)
- ✅ Restarted npm start
- ✅ Checked documentation files

---

Good luck! If you're still stuck, check the other documentation files or try searching online with your error message. 🚀
