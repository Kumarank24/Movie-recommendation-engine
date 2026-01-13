import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { fetchPopularMovies } from '../utils/tmdbApi-Native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieGrid: {
    columnWrapperStyle: {
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 16,
    },
  },
  movieCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    overflow: 'hidden',
  },
  moviePoster: {
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  watchlistButtonSmall: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  watchlistButtonText: {
    color: '#f472b6',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default function TrendingScreen({
  navigation,
  watchlist,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error loading trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      activeOpacity={0.8}
    >
      {item.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
          style={styles.moviePoster}
        />
      )}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.movieMeta}>
          <Text style={styles.metaText}>⭐ {item.vote_average?.toFixed(1)}</Text>
          <Text style={styles.metaText}>{item.release_date?.split('-')[0]}</Text>
        </View>
        <TouchableOpacity
          style={styles.watchlistButtonSmall}
          onPress={() => handleWatchlistToggle(item)}
        >
          <Text style={styles.watchlistButtonText}>
            {isInWatchlist(item.id) ? '✓ Saved' : '+ Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
          <Text style={styles.headerSubtitle}>Popular movies right now</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#818cf8" />
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            contentContainerStyle={{ paddingVertical: 16 }}
            scrollEnabled={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
}