import React, { useEffect, useState } from 'react';
import RecommendedTracks from './RecommendedTracks';
import Player from './Player';

const Main = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTrack,setSelectedTrack] = useState();
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
            `https://api.spotify.com/v1/recommendations?seed_artists=${topArtistIds.join(',')}&limit=10`,
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
        <div className="MoodSection">
          <h2>Select your mood:</h2>
          <ul>
            {moods.map((mood) => (
              <li
                className="MoodList"
                key={mood}
                onClick={() => setSelectedMood(mood)}
                style={{ fontWeight: selectedMood === mood ? 'bold' : 'normal' }}
              >
                {mood}
              </li>
            ))}
          </ul>
        </div>
        <div className="TrackList">
          {
            tracks.map((item) => (
              <div onClick={() => setSelectedTrack(item)}>
              <RecommendedTracks
                key={item.id}
                artist={item.artists[0].name}
                url={item.external_urls.spotify}
                id={item.id}
                preview_url={item.preview_url}
                duration_ms={item.duration_ms}
                name={item.name}
              />
              </div>
            ))}
        </div>
      </header>
      <div className='row'>
        <Player token = {token} trackId = {selectedTrack?.uri}/>
      </div>
    </div>
  );
};

export default Main;
