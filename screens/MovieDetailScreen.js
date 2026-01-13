import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { getMovieDetailsTMDB } from '../utils/tmdbApi-Native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropImage: {
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  },
  contentWrapper: {
    padding: 20,
  },
  posterSection: {
    flexDirection: 'row',
    marginTop: -80,
    marginBottom: 20,
    gap: 20,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  detailsSection: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 10,
  },
  metaContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    paddingVertical: 16,
    marginBottom: 20,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  metaValue: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '700',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  genreTag: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  genreText: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 12,
    marginTop: 20,
  },
  synopsis: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  castContainer: {
    marginBottom: 20,
  },
  castCard: {
    marginRight: 12,
    alignItems: 'center',
  },
  castImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginBottom: 8,
  },
  castName: {
    color: '#f1f5f9',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  castRole: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  watchlistButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(236, 72, 153, 0.4)',
    marginTop: 20,
  },
  watchlistButtonActive: {
    backgroundColor: 'rgba(236, 72, 153, 0.3)',
    borderColor: 'rgba(236, 72, 153, 0.6)',
  },
  watchlistButtonText: {
    color: '#f472b6',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default function MovieDetailScreen({
  route,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  useEffect(() => {
    setInWatchlist(isInWatchlist(movieId));
  }, [movieId]);

  const loadMovieDetails = async () => {
    setLoading(true);
    try {
      const data = await getMovieDetailsTMDB(movieId);
      setMovie(data);
    } catch (error) {
      console.error('Error loading movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movieId);
      setInWatchlist(false);
    } else {
      addToWatchlist(movie);
      setInWatchlist(true);
    }
  };

  if (loading || !movie) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {movie.backdrop_path && (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` }}
            style={styles.backdropImage}
          />
        )}

        <View style={styles.contentWrapper}>
          <View style={styles.posterSection}>
            {movie.poster_path && (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
                style={styles.posterImage}
              />
            )}
            <View style={styles.detailsSection}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
          </View>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Release:</Text>
              <Text style={styles.metaValue}>
                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Rating:</Text>
              <Text style={styles.metaValue}>{movie.vote_average?.toFixed(1)} / 10</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Runtime:</Text>
              <Text style={styles.metaValue}>{movie.runtime || 'N/A'} min</Text>
            </View>
          </View>

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genreContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {movie.overview && (
            <>
              <Text style={styles.sectionTitle}>Synopsis</Text>
              <Text style={styles.synopsis}>{movie.overview}</Text>
            </>
          )}

          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Cast</Text>
              <FlatList
                data={movie.credits.cast.slice(0, 8)}
                renderItem={({ item }) => (
                  <View style={styles.castCard}>
                    {item.profile_path && (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w185${item.profile_path}` }}
                        style={styles.castImage}
                      />
                    )}
                    <Text style={styles.castName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.castRole} numberOfLines={1}>
                      {item.character}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                scrollEnabled
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          <TouchableOpacity
            style={[styles.watchlistButton, inWatchlist && styles.watchlistButtonActive]}
            onPress={handleWatchlistToggle}
          >
            <Text style={styles.watchlistButtonText}>
              {inWatchlist ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}