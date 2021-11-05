import React from 'react'

const songListReducer = (prev, curr) => {
    return prev + "-" + curr.id;
}


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