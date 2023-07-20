import React from "react";
import { useState,useEffect } from "react";

function RecommendedTracks({name, id, url, preview_url, duration_ms, artist}){
    const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(preview_url));

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

    return(
        <body>
        <div className="card RecommendedTrack" style={{width: "100%"}}>
        <div className="TrackName card-header">
        <h3>{name}</h3>
        </div>
        <div className="TrackInfo card-body">
        <p><h5>Artist: {artist}</h5><br/>Duration: {duration_ms} ms<br/></p><p>
        <button className="PlayButton btn btn-info"onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button><br/>
        
        <a className="SpotifyButton btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">
        Open in Spotify
        </a><br/>
        </p>
        
        </div>    
        
    </div>
    </body>
    );

}

export default RecommendedTracks;
