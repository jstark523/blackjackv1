import { postTurn } from "../api/axiosConfig"
import "./GameActions.css"

const GameActions = ({turnNum, setTurnNum, dealCards, dealCardsToPlayers, players, playerCards, toggleInGame, inGame}) => {
    
    const StandFunc = () => {
        if(inGame === true){
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
    }

    const HitFunc = () => {
        if(inGame === true){
            dealCards(players[turnNum - 1]);
        }
    }

    const BotFunc = () =>{
        if(inGame === true){
            const dealerCards = playerCards.filter(cardObj => cardObj.playerIndex === players[4].playerIndex);
            const dealerTotal = dealerCards.reduce((acc, cardObj)=>{
                return acc + cardObj.card.val;
            },0);
            const userCards = playerCards.filter(cardObj => cardObj.playerIndex === players[5].playerIndex);
            const userTotal = userCards.reduce((acc, cardObj)=>{
                return acc + cardObj.card.val;
            },0);
            console.log(userTotal, "bot");
            console.log(dealerTotal, "dealer");
            if(turnNum === 5){
                const timer = setTimeout(() => {
                    if(dealerTotal <= userTotal && inGame === true){
                        HitFunc();
                    }
                    else if(inGame === true){
                        if(dealerTotal === userTotal){
                            window.alert("PUSH");
                            toggleInGame();
                        }
                        else{
                            window.alert("Loser.");
                            toggleInGame();
                        }
                    }
                    //wait 1 second
                }, 1000);
            }
            else{
                const specificPlayerCards = playerCards.filter(cardObj => cardObj.playerIndex === players[turnNum - 1].playerIndex);
                const botTotal = specificPlayerCards.reduce((acc, cardObj)=>{
                    return acc + cardObj.card.val;
                },0);
                console.log(botTotal, "bot");
                if(botTotal < dealerTotal && botTotal <= 11){
                    setTimeout(() => {
                        HitFunc();
                        //wait 1 second
                    }, 1000); 
                }
                else if(botTotal > dealerTotal && botTotal >= 16){
                    StandFunc();
                }
                else{
                    StandFunc();
                }
            } 
    }
}
    
    //not dealt
    if(turnNum === 0){
        return (
            <div>
                <button className="deal" onClick={dealCardsToPlayers}>DEAL</button>
            </div>
        )
    }
    //not user turn
    else if(turnNum !== 6){
        BotFunc();
        return (
            <div>
                <button className="stand-off">STAND</button>
                <button className="hit-off">HIT</button>
            </div>
        )
    }
    //user turn
    else {
        return(
            <div className="turn">
                <button className="stand" onClick={StandFunc}>STAND</button>
                <button className="hit" onClick={HitFunc}>Hit</button>
            </div>
        )
    }

}

export default GameActions