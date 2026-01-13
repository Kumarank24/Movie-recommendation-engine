# Movie Recommendation Engine - React Native (Android)

This is the Android/React Native version of your Movie Recommendation Engine. It provides a native mobile experience with all the features of your web version.

## Features

✅ **Movie Search** - Search for movies by title
✅ **Movie Details** - View comprehensive movie information with cast
✅ **Watchlist** - Save movies to your personal watchlist (persistent)
✅ **Trending** - Browse popular movies
✅ **Mood-Based Recommendations** - Get movies based on your mood
✅ **Multi-Language Support** - Filter movies by language
✅ **Professional UI** - Dark theme with premium animations and transitions

## Setup Instructions

### Option 1: Using Expo (Recommended for quick testing)

#### Prerequisites
- Node.js and npm installed
- Android phone or Android emulator

#### Steps

1. **Install Expo CLI globally**
```bash
npm install -g expo-cli
```

2. **Navigate to project directory**
```bash
cd "c:\Users\LENOVO\Documents\Movie Recommendation Engine"
```

3. **Install dependencies**
```bash
npm install --save-exact expo@51.0.0 react@18.2.0 react-native@0.74.1
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
```

4. **Start the development server**
```bash
expo start
```

5. **Run on Android**
   - Press `a` in the terminal to open Android emulator
   - OR scan the QR code with Expo Go app on your phone

### Option 2: Using React Native CLI (For production)

#### Prerequisites
- Android SDK installed
- Android emulator or connected device

#### Steps

1. **Install dependencies**
```bash
npm install
```

2. **Build APK**
```bash
eas build --platform android
```

3. **Run on device**
```bash
react-native run-android
```

## Project Structure

```
Movie Recommendation Engine/
├── App-Native.js              # Main app entry point
├── screens/
│   ├── HomeScreen.js          # Home/Search page
│   ├── MovieDetailScreen.js   # Movie details page
│   ├── WatchlistScreen.js     # Watchlist page
│   ├── TrendingScreen.js      # Trending movies page
│   └── MoodMoviesScreen.js    # Mood-based movies page
├── utils/
│   └── tmdbApi-Native.js      # TMDB API functions
├── app.json                    # Expo configuration
├── babel.config.js            # Babel configuration
└── package-native.json        # Dependencies list
```

## Features Explained

### Home Screen
- Search for movies by title
- Browse popular movies
- Quick access to all main sections

### Movie Details
- Full movie information (title, year, rating, runtime)
- Genre tags
- Cast member information
- Full synopsis
- Add/Remove from watchlist

### Watchlist
- View all saved movies
- Quick actions to view details or remove
- Movie count badge
- Persistent storage using AsyncStorage

### Trending
- See what's popular right now
- Quick save/remove watchlist buttons
- Click to view full details

### Mood Movies
- Select a mood (Action, Comedy, Romance, Horror, Drama, Sci-Fi, Thriller)
- Get personalized movie recommendations
- Filter by language if needed

## API Integration

The app uses the **TMDB (The Movie Database) API v3** with your API key:
- Endpoint: https://api.themoviedb.org/3
- Your API Key: 45c0e669336d34c17afec6176cd5e74e

All API calls are handled in `utils/tmdbApi-Native.js`

## Styling

React Native StyleSheet replaces CSS with native styling:
- Dark theme with indigo, pink, and amber colors
- Professional spacing and typography
- Responsive design for different screen sizes
- Smooth animations and transitions

## Data Persistence

Your watchlist is automatically saved to device storage using:
- **AsyncStorage** for React Native apps
- Equivalent to localStorage in web apps
- Data persists between app sessions

## Troubleshooting

### "Site can't be reached" during development
- Make sure your internet connection is active
- Check that TMDB API key is valid

### App won't build
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Expo cache: `expo r -c`

### Movies not loading
- Check API key configuration in `utils/tmdbApi-Native.js`
- Verify internet connection
- Check TMDB API status

## Building for Production

### Android APK

1. **Using Expo Application Services (EAS)**
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build APK
eas build --platform android
```

2. **Using Android Studio**
```bash
# Generate release build
cd android
./gradlew assembleRelease
```

## Next Steps

1. Test on Android emulator or device
2. Customize app theme if desired
3. Build APK for distribution
4. Submit to Google Play Store

## System Requirements

- **Android Version**: 5.0 (API 21) or higher
- **RAM**: 2GB minimum
- **Storage**: 50MB for app + cache

## Support

For issues with:
- **TMDB API**: Visit https://www.themoviedb.org/settings/api
- **React Native**: Visit https://reactnative.dev/docs
- **Expo**: Visit https://docs.expo.dev/

---

**Note**: This is the native Android version. For web, use the React version at `App.jsx`.