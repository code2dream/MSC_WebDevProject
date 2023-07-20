import React from 'react';
import './App.css';
import {useEffect, useState} from "react";
import Login from "./Login";
import Main from "./Main";

function App() {

  const [token, setToken] = useState("");
  
  useEffect(() => {

      async function getToken() {

          const response = await fetch('/auth/token');
          const json = await response.json();
          setToken(json.access_token);

      }

      getToken();

  }, []);

    return <React.Fragment>{token ? <Main token={token} /> : <Login/>}</React.Fragment>;

}

export default App;