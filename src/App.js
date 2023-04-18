import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import { getPlayers } from './api/axiosConfig';

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
      <Game players={players}/>
    </div>
  );
}

export default App;