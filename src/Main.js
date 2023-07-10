import React from "react";
import './App.css';
import { useEffect, useState } from "react";
import MoodSelection from "./MoodSelection";
import RecommendedTracks from "./RecommendedTracks";

function Main({token}) {
  
  const [tracks, setTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  useEffect(() => {
        if (!token){
            return;
        }
        const fetchRecommendedTracks = async () => {
            const response = await fetch(
              `https://api.spotify.com/v1/recommendations?seed_genres=${selectedMood}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
        const data = await response.json();
        setTracks(data.tracks);
      };

      if(selectedMood){
          fetchRecommendedTracks();
      }
  }, [token, selectedMood]);


  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  }


  return(
    <div className="App">
      <header className="App-header">
         
         <div className="MoodList">
  
          <MoodSelection onMoodSelect={handleMoodSelect}/>
          </div>
          <div className="TrackList">
          {selectedMood && <RecommendedTracks tracks = {tracks}/>}
  
         </div>
        
      </header>
  
    </div>
  );
};



export default Main;