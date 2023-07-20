import React from "react";

function RecommendedTracks({name, id, url, preview_url, duration_ms, artist}){

    return(
        <a key = {id} href={"#"} className="list-group-item list-group-item-action">

            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{name}</h5>
            </div>
            <p className="mb-1">{artist}</p>
        </a>
    );

}

export default RecommendedTracks;
