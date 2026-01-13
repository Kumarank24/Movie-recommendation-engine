// Cosine similarity calculation for genre-based recommendations
export const cosineSimilarity = (genresA, genresB) => {
  if (!genresA || !genresB) return 0;
  
  const setA = new Set(genresA);
  const setB = new Set(genresB);
  const allGenres = new Set([...genresA, ...genresB]);

  if (allGenres.size === 0) return 0;

  const vectorA = Array.from(allGenres).map(g => setA.has(g) ? 1 : 0);
  const vectorB = Array.from(allGenres).map(g => setB.has(g) ? 1 : 0);

  const dotProduct = vectorA.reduce((sum, x, i) => sum + x * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, x) => sum + x * x, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, x) => sum + x * x, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (magnitudeA * magnitudeB);
};

// Generate recommendations based on multiple factors
export const generateRecommendations = (selectedMovie, allMovies) => {
  if (!selectedMovie) return [];

  return allMovies
    .filter(m => m.id !== selectedMovie.id)
    .map(m => ({
      ...m,
      genreSimilarity: cosineSimilarity(selectedMovie.genres, m.genres),
      ratingDifference: Math.abs(selectedMovie.rating - m.rating) / 10
    }))
    .map(m => ({
      ...m,
      // Combine genre similarity (weight: 70%) and rating similarity (weight: 30%)
      score: m.genreSimilarity * 0.7 + (1 - Math.min(m.ratingDifference, 1)) * 0.3
    }))
    .sort((a, b) => b.score - a.score)
    .filter(m => m.score > 0.3)
    .slice(0, 6);
};
