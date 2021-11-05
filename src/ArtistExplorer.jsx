import './ArtistExplorer.css';
import Nav from './components/Nav'
import About from './components/About'
import React, { useEffect, useState } from 'react'
import { generatePlaylist } from './scripts/spotifySearch'
import Traverser from './components/Traverser';
import Input from './components/Input';


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

function ArtistExplorer() {
    const [token, setToken] = useState(null);
    const [pageChoice, setPageChoice] = useState('main');
    const [startName, setStartName] = useState('');
    const [endName, setEndName] = useState('');
    const [searching, setSearching] = useState(false);
    const [playlistID, setPlaylistID] = useState(null);

    const newPageChoice = (name) => {
        if (name === 'about') {
            setPageChoice('about');
        } else {
            window.location.reload();
        }
    }

    useEffect(() => {
        if (hash.access_token && hash.state) {
            setToken(hash.access_token);
            window.location.hash = '';
        }
    }, [])

    useEffect(() => {
        if (token && hash.state) {
            let songList = hash.state.split('-').filter(elmt => elmt !== "");
            generatePlaylist(token, songList)
                .then(res => setPlaylistID(res));
        }
    }, [token])

    const beginSearch = () => {
        setSearching(true);
    }

    return ( 
        <div className = "App" >
            <Nav clickHandler = { newPageChoice }/> 
            {pageChoice === 'main' ?
                <main> 
                    {token ?
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