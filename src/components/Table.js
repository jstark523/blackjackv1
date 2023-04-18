import React from 'react';
import Player from './Player';
import './Table.css'
import PlayerCards from './PlayerCards';

const Table = ({ players, playerCards }) => {
  return (
    <div className="table">
      {players.map((player) => (
        <div className={`player player-${player.playerIndex}`} key={player.name}>
          <Player player={player} />
          <div className = {`playerCard-${player.playerIndex}`}>
          <PlayerCards playerIndex={player.playerIndex} playerCards={playerCards}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;