import './ArtistExplorer.css';
import Nav from './components/Nav'
import About from './components/About'
import React, { useEffect, useState } from 'react'
import { generatePlaylist } from './scripts/spotifySearch'
import Traverser from './components/Traverser';
import Input from './components/Input';

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
window.location.hash = "";

// Main component for the spotify artist explorer 
function ArtistExplorer() {
    const [token, setToken] = useState(null); //Spotify access token
    const [pageChoice, setPageChoice] = useState('main'); //display main or about page
    const [startName, setStartName] = useState(''); //starting artist
    const [endName, setEndName] = useState(''); //ending artist
    const [searching, setSearching] = useState(false); //whether search is currently happening
    const [playlistID, setPlaylistID] = useState(null); //stores playlist id once generated

    // Sets the current page choice. 'main' or invalid choices refresh page to base state
    const newPageChoice = (name) => {
        if (name === 'about') {
            setPageChoice('about');
        } else {
            window.location.reload();
        }
    }

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
            <Nav clickHandler = { newPageChoice }/> 
            {pageChoice === 'main' ? // display main or about 
                <main> 
                    {token ? // if user token is available, display post-playlist info
                        <div className='playlist-added'>
                            <h1> Playlist Added </h1> 
                            <a className='playlist-button' href={`https://open.spotify.com/playlist/${playlistID}`} target='_blank' rel="noopener noreferrer">
                                <p>Open Spotify?</p>
                            </a>
                        </div>: 
                        searching ? 
                            <Traverser startName={startName} endName={endName}/>:
                            <Input setStartName={setStartName} setEndName={setEndName} beginSearching={beginSearch}/>
                        
                    } 
                </main> : 
                <About />
            } 
            <footer>
                <p> Marshall Wilson 2021 | <a href = "http://www.marshallwilson.info" > www.marshallwilson.info </a></p>
            </footer> 
        </div>
    );
}

export default ArtistExplorer;