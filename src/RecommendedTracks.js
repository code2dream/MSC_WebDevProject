import React from "react";

const RecommendedTracks = ({tracks}) => {

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