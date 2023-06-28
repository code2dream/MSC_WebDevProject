import React from "react";
import './App.css';
import MoodSelection from "./MoodSelection";
import { useEffect, useState } from "react";

function App() {
  
  return(

    <div className="container">
      <h1 className="main_heading">Mood Based Playlist Generator</h1>
      <div className="row">
        <MoodSelection/>
      </div>
    </div>

  );

}

export default App;