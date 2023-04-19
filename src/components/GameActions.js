import { postTurn } from "../api/axiosConfig"
import "./GameActions.css"

const GameActions = ({turnNum, setTurnNum, dealCards, dealCardsToPlayers, players, playerCards}) => {
    
    const StandFunc = () => {
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

    const HitFunc = () => {
        dealCards(players[turnNum - 1]);
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