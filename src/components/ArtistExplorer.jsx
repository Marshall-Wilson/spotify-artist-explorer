import '../ArtistExplorer.css';
import React, { useEffect, useState } from 'react'
import { generatePlaylist } from '../scripts/spotifySearch'
import Traverser from './Traverser';
import Input from './Input';

// Retrieves access token and playlist info from Spotify callback
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
console.log(window.location);
window.location.hash = "";


// Main component for the spotify artist explorer 
function ArtistExplorer() {
    const [token, setToken] = useState(null); //Spotify access token
    const [startName, setStartName] = useState(''); //starting artist
    const [endName, setEndName] = useState(''); //ending artist
    const [searching, setSearching] = useState(false); //whether search is currently happening
    const [playlistID, setPlaylistID] = useState(null); //stores playlist id once generated


    // On load check hash for access token
    useEffect(() => {
        if (hash.access_token && hash.state) {
            setToken(hash.access_token);
            window.location.hash = '';
        }
    }, [])

    // If access token and playlist info are available, generate playlist for user
    useEffect(() => {
        if (token && hash.state) {
            let songList = hash.state.split('-').filter(elmt => elmt !== "");
            generatePlaylist(token, songList)
                .then(res => setPlaylistID(res));
        }
    }, [token])

    // Click handler for initial input
    const beginSearch = () => {
        setSearching(true);
    }

    return ( 
        <div className = "artist-explorer" >
                <main> 
                    {token ? // if user token is available, display post-playlist info
                        <div className='playlist-added'>
                            <h1> Playlist Added </h1> 
                            <a className='playlist-button' href={`https://open.spotify.com/playlist/${playlistID}`} target='_blank' rel="noopener noreferrer">
                                <p>Open Spotify?</p>
                            </a>
                        </div>: 
                        searching ? // if input has been submitted, start the traverser, otherwise display input 
                            <Traverser startName={startName} endName={endName}/>:
                            <Input setStartName={setStartName} setEndName={setEndName} beginSearching={beginSearch}/>
                        
                    } 
                </main>
            
        </div>
    );
}

export default ArtistExplorer;