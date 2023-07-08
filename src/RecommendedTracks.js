import React from "react";
import { useState, useEffect } from "react";

const RecommendedTracks = ({Mood,token}) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchRecommendedTracks = async () => {
            const response = await fetch(
                `https://api.spotify.com/v1/recommendations?seed_genres=${Mood}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        )
        if (response.ok){
            const data = await response.json();
            setTracks(data.tracks);
        }
        };

        if(Mood){
            fetchRecommendedTracks();
        }
    }, [Mood])

    return(
        <div>
            <h2>Recommended Tracks</h2>
            {
                tracks.map((track) => (
                    <div key={track.id}>
                        <img src={track.album.image[0].url} alt={track.album.name} />
                        <h3>{track.name}</h3>
                        <p>Artist: {track.artists[0].name}</p>
                        <p>Album: {track.album.name}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default RecommendedTracks;