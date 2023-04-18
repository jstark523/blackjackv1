
const HitFunc = () => {
    return(
        <>
        </>
    )
}

const StandFunc = (event, turnNum, setTurnNum) => {
    console.log("entered");
    if(turnNum === 6){
        setTurnNum(1);
    }
    else{
        setTurnNum(prevTurnNum => prevTurnNum + 1);
    }
}




const GameActions = ({turnNum, setTurnNum, dealCards, playerCards}) => {
    //not dealt
    if(turnNum === 0){
        return (
            <div>
                <button className="DealButton" onClick={dealCards}>Deal</button>
            </div>
        )
    }
    //not user turn
    else if(turnNum !== 3){
        return (
            <div>
                <button className="stand">Stand</button>
                <button className="hit">Hit</button>
                <button className="bet">Bet</button>
            </div>
        )
    }
    //user turn
    else {
        return(
            <div className="turn">
                <button className="stand" onClick={(event) => {
                    console.log("clicked");
                    StandFunc(event, turnNum ,setTurnNum)}
                    
                }>Stand</button>
                <button className="hit" onClick={HitFunc}>Hit</button>
                <button className="bet">Bet</button>
            </div>
        )
    }

}

export default GameActions