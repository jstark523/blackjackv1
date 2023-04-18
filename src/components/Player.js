import React from 'react';
import './Player.css'

const Player = ({ player }) => {
  return (
    <div>
      <img src={player.imdbImg} alt={player.name} />
      <h2>{player.name}</h2>
      <p>chips: {player.money}</p>
    </div>
  );
}

export default Player;