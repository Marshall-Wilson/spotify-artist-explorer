import React from 'react'

const Artist = ({artistInfo}) => {
    return (
        <div id='Artist'>
            <h2>{artistInfo.name}</h2>
            {artistInfo.images && artistInfo.images[0] ? 
                <img alt={artistInfo.name} src={artistInfo.images[0].url}/> :
                null
            }           
        </div>
    )
}

export default Artist
