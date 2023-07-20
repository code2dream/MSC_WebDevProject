import React, { useEffect, useState } from 'react';
import RecommendedTracks from './RecommendedTracks';

const Main = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const moods = ['Dance', 'Happy', 'Sad', 'Energetic', 'Relaxed', 'Work-Out'];

  useEffect(() => {
    async function fetchRecommendedTracks(){
      try {
        const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (topArtistsResponse.ok) {
          const topArtistsData = await topArtistsResponse.json();
          const topArtistIds = topArtistsData.items.map((artist) => artist.id).slice(0, 5);

          const recommendedTracksResponse = await fetch(
            `https://api.spotify.com/v1/recommendations?seed_artists=${topArtistIds.join(',')}&limit=20`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (recommendedTracksResponse.ok) {
            const recommendedTracksData = await recommendedTracksResponse.json();
            setTracks(recommendedTracksData.tracks);
          } else {
            console.error(
              'Error fetching recommended tracks:',
              recommendedTracksResponse.status
            );
          }
        } else {
          console.error('Error fetching top artists:', topArtistsResponse.status);
        }
      } catch (error) {
        console.error('Error fetching recommended tracks', error);
      }
    };

    if (selectedMood) {
      fetchRecommendedTracks();
    }
  }, [token, selectedMood]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading1'>Moody: A Mood Based Playlist Generator</h1>
      </header>

      <main>
        <div className="MoodSection col-9">
          <h3 className='heading2'>Select your mood:</h3>
          <select
            className="MoodList"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            {moods.map((mood) => (
              <option
                key={mood}
                onClick={() => setSelectedMood(mood)}
                style={{ fontWeight: selectedMood === mood ? 'bold' : 'normal' }} 
                value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
        <div className="TrackList">
          {tracks.length > 0 ? (
            tracks.map((item) => (
              <RecommendedTracks
                key={item.id}
                img={item.imgs}
                artist={item.artists[0].name}
                url={item.external_urls.spotify}
                id={item.id}
                preview_url={item.preview_url}
                duration_ms={item.duration_ms}
                name={item.name}
              />
            ))
          ) : (
            <p>No recommended tracks found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
