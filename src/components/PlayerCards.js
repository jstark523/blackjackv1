import './PlayerCards.css'

const PlayerCards = ({ playerIndex, playerCards }) => {
    if(playerCards.length !== 0){
      const specificPlayerCards = playerCards.filter(cardObj => cardObj.playerIndex === playerIndex);
      return (
        <div id="player-cards">
          {specificPlayerCards.map((cardObj) => (
            <img key = {cardObj.card.imgPath} src={cardObj.card.imgPath} alt = {""} style={{ borderRadius: 0 }}/>
          ))}
        </div>
      );
    }
  }

  export default PlayerCards