import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import { getPlayers } from './api/axiosConfig';
import "./App.css"

const App = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers()
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="top-bar"></div>
      <Game players={players}/>
      <div className="bottom-bar"></div>
    </div>
  );
}

export default App;