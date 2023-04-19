import React, { useState, useEffect } from 'react';
import { newDeck, getDeck, dealCard, updatePlayerCard, clearCards, getCurrentCards, postTurn } from '../api/axiosConfig';
import './Game.css'
import Table from './Table';
import GameActions from './GameActions';

const Game = ({ players }) => {
  const [deckId, setDeckId] = useState(null);
  const [inGame, setInGame] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [turnNum, setTurnNum] = useState(0);

  // Load game if mid-game when the component mounts
  useEffect(() => {   
    if(deckId === null){
        getDeck(1)
        .then(response => {
            if (response.status === 200 && response.data !== null) {
                setDeckId(response.data.tableNumber);
                setTurnNum(response.data.turn);
                window.alert("Game already in progress");
                getCurrentCards()
                .then(response =>{
                  setPlayerCards(response.data)
                })
                setInGame(true);
            }
          })
        .catch(error => {
              if(error.response.status !== 404){
                console.error(error);
              }
          });
    }
  }, [deckId]);

  useEffect(() => {
    const specificPlayerCards = playerCards.filter(cardObj => cardObj.playerIndex === players[turnNum - 1].playerIndex);
    const cardTotal = specificPlayerCards.reduce((acc, cardObj)=>{
        return acc + cardObj.card.val;
    },0);
    console.log(cardTotal);
    if(cardTotal >= 21){
        if(turnNum === 6){
            setTurnNum(1);
            postTurn(1);
        }
        else{
            const newTurnNum = turnNum + 1;
            setTurnNum(newTurnNum);
            postTurn(newTurnNum);
        }
    }
  }, [playerCards])

  //to deal card to specific player and update db
  const dealCards = async (player) => {
    try {
      const response = await dealCard(deckId);
      const card = response.data;
      await updatePlayerCard(player.name, card);
      const cardObj = {
        playerIndex: player.playerIndex, 
        card: card
      }
      setPlayerCards(prevPlayerCards => [...prevPlayerCards, cardObj]);
      console.log(`Dealt ${card.val} to ${player.name}`);
    } catch (error) {
      console.error(`Failed to deal card to ${player.name}:`, error);
    }
  }

  //to deal initial cards
  const dealCardsToPlayers = async () => {
    const turnone = 1;
    setTurnNum(turnone);
    for (const player of players) {
      await dealCards(player);
    }
    for (const player of players) {
      await dealCards(player);
    }
    postTurn(turnone);
  }
  
  //to start new game and clear db
  const newGame = () => {
    const gameVal = true;
    setInGame(gameVal);
    newDeck()
    .then(response => {
      setDeckId(response.data.tableNumber);
      clearCards()
      .then(response => {
        const emptyPlayer = [];
        setPlayerCards(emptyPlayer);
      })
      .catch(error => {
        console.log("error clearing cards")
        console.error(error);
      })
    }
    )
    .catch(error => {
      console.log("error making new deck")
      console.error(error);
    })
  }

  if(inGame){
    return (
      <div>
        <Table players={players} playerCards = {playerCards}/>
        <GameActions turnNum = {turnNum} setTurnNum = {setTurnNum} dealCards = {dealCards} dealCardsToPlayers={dealCardsToPlayers} players={players} playerCards={playerCards}/>
      </div>
    );
  }
  else{
    return (
      <div>
        <button className= "newGameButton" onClick={newGame}>New Game</button>
      </div>
    );
  }


}

export default Game;