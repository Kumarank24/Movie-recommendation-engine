import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { discoverMoviesByGenres } from '../utils/tmdbApi-Native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.15)',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  headerSubtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '400',
  },
  moodContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  moodButton: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  moodButtonActive: {
    backgroundColor: 'linear-gradient(135deg, #818cf8, #6366f1)',
    borderColor: '#818cf8',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
  },
  moodLabelActive: {
    color: '#fff',
    fontWeight: '700',
  },
  moviesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    overflow: 'hidden',
    marginBottom: 12,
  },
  moviePoster: {
    width: '100%',
    height: 220,
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
  ratingText: {
    color: '#818cf8',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

const MOODS = [
  { id: 'action', label: 'Action', emoji: '🎬', genres: [28] },
  { id: 'comedy', label: 'Comedy', emoji: '😂', genres: [35] },
  { id: 'romance', label: 'Romance', emoji: '💕', genres: [10749] },
  { id: 'horror', label: 'Horror', emoji: '👻', genres: [27] },
  { id: 'drama', label: 'Drama', emoji: '🎭', genres: [18] },
  { id: 'scifi', label: 'Sci-Fi', emoji: '🚀', genres: [878] },
  { id: 'thriller', label: 'Thriller', emoji: '😰', genres: [53] },
];

const LANGUAGES = [
  { id: 'en', label: 'English', code: 'en' },
  { id: 'es', label: 'Spanish', code: 'es' },
  { id: 'fr', label: 'French', code: 'fr' },
  { id: 'de', label: 'German', code: 'de' },
  { id: 'ja', label: 'Japanese', code: 'ja' },
];

export default function MoodMoviesScreen({
  navigation,
  watchlist,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    try {
      const data = await discoverMoviesByGenres(mood.genres, selectedLanguage);
      setMovies(data);
    } catch (error) {
      console.error('Error loading mood movies:', error);
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
        <Text style={styles.ratingText}>⭐ {item.vote_average?.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Pick Your Mood</Text>
          <Text style={styles.headerSubtitle}>Get movies based on how you feel</Text>
        </View>

        <ScrollView style={styles.moodContainer}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodButton,
                selectedMood?.id === mood.id && styles.moodButtonActive,
              ]}
              onPress={() => handleMoodSelect(mood)}
              activeOpacity={0.8}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodLabel,
                  selectedMood?.id === mood.id && styles.moodLabelActive,
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedMood && (
          <View style={styles.moviesSection}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#818cf8" />
              </View>
            ) : movies.length === 0 ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.emptyText}>No movies found for this mood</Text>
              </View>
            ) : (
              <FlatList
                data={movies}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
                scrollEnabled={true}
              />
            )}
          </View>
        )}

        {!selectedMood && (
          <View style={styles.loadingContainer}>
            <Text style={styles.emptyText}>Select a mood to see movies</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}