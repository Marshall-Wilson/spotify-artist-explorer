import React from 'react'

//reduces a list of songs into a single string of ids
const songListReducer = (prev, curr) => {
    return prev + "-" + curr.id;
}

//subcomponent for allowing the user to add a list of songs to their spotify account
//actual playlist adding is handled on callback to ArtistExplorer component
const Playlist = ({songList}) => {
    const redirectURI = "http://10.0.0.150:3000"
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientID = "d4c2fd522b164d169533cc916f7c5d27";
    const scopes = [
        "user-modify-private",
        "playlist-modify-private"
    ];
    const requestURL = `${authEndpoint}?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}&state=${songList.reduce(songListReducer, "")}&scope=${scopes.join("%20")}&show_dialog=true`
    
    return (
        <div className="playlist">
            <a className="playlist-button" href={requestURL}>
                <p>Get The Playlist</p>
            </a>
        </div>
    )
}

export default Playlist