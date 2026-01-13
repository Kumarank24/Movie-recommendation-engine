import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { searchMoviesTMDB, fetchPopularMovies } from '../utils/tmdbApi-Native';

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
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f1f5f9',
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: 'linear-gradient(135deg, #818cf8, #6366f1)',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  navContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  navButtonActive: {
    backgroundColor: '#818cf8',
    borderColor: '#818cf8',
  },
  navButtonText: {
    color: '#cbd5e1',
    fontWeight: '600',
    fontSize: 14,
  },
  navButtonTextActive: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  movieGrid: {
    columnWrapperStyle: {
      justifyContent: 'space-between',
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
    marginBottom: 8,
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
    marginBottom: 6,
  },
  movieRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#818cf8',
    fontWeight: '700',
    fontSize: 13,
  },
  ratingIcon: {
    fontSize: 13,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default function HomeScreen({ navigation, watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await searchMoviesTMDB(searchQuery);
      setMovies(results);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
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
        <View style={styles.movieRating}>
          <Text style={styles.ratingText}>{item.vote_average?.toFixed(1)}</Text>
          <Text style={styles.ratingIcon}>⭐</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MovieFlix</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.navContainer}>
          <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
            <Text style={[styles.navButtonText, styles.navButtonTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Trending')}>
            <Text style={styles.navButtonText}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Watchlist')}>
            <Text style={styles.navButtonText}>Watchlist ({watchlist.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MoodMovies')}>
            <Text style={styles.navButtonText}>Mood</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#818cf8" />
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : movies.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.emptyText}>No movies found</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
            scrollEnabled={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
}