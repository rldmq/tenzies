import React from "react"

export default function Die({value, id, isHeld, holdDie}){

    const styles ={
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" id={id} onClick={holdDie} style={styles}>
            <h2>{value}</h2>
        </div>
    )
}