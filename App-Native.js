import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import TrendingScreen from './screens/TrendingScreen';
import MoodMoviesScreen from './screens/MoodMoviesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist from AsyncStorage on app start
  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const savedWatchlist = await AsyncStorage.getItem('movieWatchlist');
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem('movieWatchlist', JSON.stringify(updated));
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const updated = watchlist.filter(m => m.id !== movieId);
      setWatchlist(updated);
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem('movieWatchlist', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
            borderBottomColor: 'rgba(99, 102, 241, 0.2)',
          },
          headerTintColor: '#f1f5f9',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: '#0f172a' },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              watchlist={watchlist}
              isInWatchlist={isInWatchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="MovieDetail"
          options={{ title: 'Movie Details' }}
        >
          {(props) => (
            <MovieDetailScreen
              {...props}
              isInWatchlist={isInWatchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Watchlist"
          options={{ title: 'My Watchlist' }}
        >
          {(props) => (
            <WatchlistScreen
              {...props}
              watchlist={watchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Trending"
          options={{ title: 'Trending Movies' }}
        >
          {(props) => (
            <TrendingScreen
              {...props}
              watchlist={watchlist}
              isInWatchlist={isInWatchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="MoodMovies"
          options={{ title: 'Movies by Mood' }}
        >
          {(props) => (
            <MoodMoviesScreen
              {...props}
              watchlist={watchlist}
              isInWatchlist={isInWatchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}