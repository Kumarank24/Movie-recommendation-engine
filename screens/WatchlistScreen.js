import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

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
    paddingVertical: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f1f5f9',
  },
  countBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  countText: {
    color: '#fbbf24',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  watchlistCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
  },
  cardImage: {
    width: 100,
    height: 150,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#818cf8',
    fontWeight: '700',
    fontSize: 13,
  },
  removeButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fca5a5',
    fontWeight: '700',
    fontSize: 13,
  },
  contentContainer: {
    paddingVertical: 16,
  },
});

export default function WatchlistScreen({ navigation, watchlist, removeFromWatchlist }) {
  const handleViewDetails = (movieId) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  const renderWatchlistItem = ({ item }) => (
    <View style={styles.watchlistCard}>
      {item.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>⭐ {item.vote_average?.toFixed(1)}</Text>
            <Text style={styles.metaText}>{item.release_date?.split('-')[0]}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewDetails(item.id)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromWatchlist(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Watchlist</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{watchlist.length} movies</Text>
          </View>
        </View>

        {watchlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Your watchlist is empty. Start adding movies!
            </Text>
          </View>
        ) : (
          <FlatList
            data={watchlist}
            renderItem={renderWatchlistItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
}