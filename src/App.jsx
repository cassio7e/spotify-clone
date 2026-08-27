import { useState, useRef } from 'react';
import './App.css';

const TRACKS = [
  {
    id: 1,
    title: "Synthwave Pulse",
    artist: "Electronic Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Chill Horizon",
    artist: "Lofi Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Deep Focus",
    artist: "Ambient Sound",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // On attend le prochain tick pour charger et lancer la nouvelle musique
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  return (
    <div className="spotify-container">
      <div className="spotify-body">
        {/* Barre latérale */}
        <div className="sidebar">
          <h2>Spotify Clone</h2>
          <ul>
            <li>🏠 Accueil</li>
            <li>🔍 Rechercher</li>
            <li>📚 Bibliothèque</li>
          </ul>
        </div>

        {/* Contenu principal */}
        <div className="main-content">
          <h1>Bonne écoute</h1>
          
          <div className="song-list">
            {TRACKS.map((track) => (
              <div 
                key={track.id} 
                className="song-card" 
                onClick={() => playTrack(track)}
              >
                <div className="song-info">
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </div>
                <button className="play-btn">▶</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lecteur du bas */}
      <div className="player">
        <div className="player-track-info">
          <strong>{currentTrack ? currentTrack.title : "Aucun titre"}</strong>
          <p style={{ color: "#b3b3b3", fontSize: "0.8rem" }}>
            {currentTrack ? currentTrack.artist : ""}
          </p>
        </div>

        {/* Élément HTML5 Audio caché piloté par React */}
        <audio ref={audioRef} src={currentTrack?.url} />

        <div className="player-controls">
          <button onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
        
        <div>🔊 Volume</div>
      </div>
    </div>
  );
}

export default App;