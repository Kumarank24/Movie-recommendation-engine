import '../styles/MoodSelector.css';

function MoodSelector({ selectedMood, onMoodSelect }) {
  const moods = [
    { id: 'happy', label: '😊 Happy', emoji: '😊', genres: ['Comedy', 'Animation', 'Family'] },
    { id: 'sad', label: '😢 Sad', emoji: '😢', genres: ['Drama'] },
    { id: 'excited', label: '🤩 Excited', emoji: '🤩', genres: ['Action', 'Adventure', 'Sci-Fi'] },
    { id: 'scared', label: '😨 Scared', emoji: '😨', genres: ['Horror', 'Thriller'] },
    { id: 'romantic', label: '💕 Romantic', emoji: '💕', genres: ['Romance'] },
    { id: 'curious', label: '🤔 Curious', emoji: '🤔', genres: ['Mystery', 'Crime', 'Thriller'] },
    { id: 'relaxed', label: '😌 Relaxed', emoji: '😌', genres: ['Drama', 'Documentary'] },
  ];

  return (
    <section className="mood-selector-section">
      <div className="mood-header">
        <h2>What's Your Mood?</h2>
        <p>Select your current mood and we'll suggest movies for you</p>
      </div>

      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-button ${selectedMood === mood.id ? 'active' : ''}`}
            onClick={() => onMoodSelect(mood.id)}
            title={`Genres: ${mood.genres.join(', ')}`}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default MoodSelector;
