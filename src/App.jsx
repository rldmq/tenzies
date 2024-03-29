import React from "react"

import Die from "./Die.jsx"

export default function App(){

    const [dice, setDice] = React.useState(newDice())
    const [winState, setWinState] = React.useState(false)

    React.useEffect(()=>{
        if(dice.every(die => die.isHeld) && dice.every(die => dice[0].value === die.value)){
            setWinState(true)
            console.log("Win!")
        }
    },[dice])

    function newDice(){
        const diceArr = []
        for(let i = 0; i < 10; i++){
            diceArr.push(createDie(i))
        }
        return diceArr
    }

    function createDie(id){
        return {
            value: randomNumbers(), 
            id: id, 
            isHeld: false
        }
    }

    function randomNumbers(){
        return Math.ceil(Math.random()*6)
    }

    function holdDie(id){
        setDice(dice => dice.map(
            die => die.id === id ?
            {...die, isHeld: !die.isHeld}
            : die)
        )
    }

    function handleRoll(){
        if(winState){
            setDice(newDice())
            setWinState(false)
        }else{
            setDice(dice => dice.map(die => die.isHeld ?
                die 
                : {...die, value: randomNumbers()})
            )
        }
    }
    
    return (
        <div className="app-container">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dice.map(e => <Die key={e.id} id={e.id} isHeld={e.isHeld} value={e.value} holdDie={()=> holdDie(e.id)}/>)}
            </div>
            <button className="roll-btn" onClick={handleRoll}>{winState ? "New Game" : "Roll"}</button>
        </div>
    )
}

// TO DO:
// timer
// roll counter
// global high scores (time and rolls)
// local high scores (time and rolls)