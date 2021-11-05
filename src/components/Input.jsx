import React from 'react'

const Input = ({setStartName, setEndName, beginSearching}) => {
    
    return (
        <div className="input">
            <p>Find the shortest path between two artists</p>
            <input type="text" placeholder="Starting Artist Name" onChange={(e) => setStartName(e.target.value)}></input>
            <input type="text" placeholder="Ending Artist Name" onChange={(e) => setEndName(e.target.value)}></input>
            <button onClick={beginSearching}>Search</button>
        </div>
    )
}

export default Input
