import React from "react";
import './App.css';
import { useEffect, useState } from "react";

function App() {

  const CLIENT_ID = "2d4260ca22284153a343c576ee3c90cf";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

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

  }, [])

const logout = () => {
  setToken("");
  window.localStorage.removeItem("token");
}

return(
  <div className="App">
    <header className="App-header">
      {!token ?
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      : <button className="btn-primary" onClick={logout}>Logout</button>}
    </header>

  </div>
);

}

export default App;