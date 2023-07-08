import React from "react";
import './App.css';
import { useEffect, useState } from "react";
import MoodSelection from "./MoodSelection";
import RecommendedTracks from "./RecommendedTracks";

function App() {

  const CLIENT_ID = "2d4260ca22284153a343c576ee3c90cf";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  
  

  
  //Token Generation
  const [token,setToken] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }

  }, []);

  //Logout Button
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  const [selectedMood, setSelectedMood] = useState('');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);    
  }


  return(
    <div className="App">
      <header className="App-header">
        {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        : <button className="Logout_Button btn-primary" onClick={logout}>Logout</button>}
      
        {token ?
         
         <div>
  
          <MoodSelection onMoodSelect={handleMoodSelect}/>
          {selectedMood && <RecommendedTracks selectedMood={selectedMood}/>}
  
         </div>
  
  
          : <hr></hr>
  
        }
      </header>
  
    </div>
  )
};



export default App;