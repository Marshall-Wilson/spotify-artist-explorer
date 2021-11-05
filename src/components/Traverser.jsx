import SpotifyWebApi from 'spotify-web-api-js'
import React, {useEffect, useState, useRef} from 'react'
import {authorize, searchRelated, generateSongList} from '../scripts/spotifySearch'
import Artist from './Artist'
import Playlist from './Playlist'


// subcomponent of ArtistExplorer
// executes and displays the artist search process and results
const Traverser = ({startName, endName}) => {
    const [token, setToken] = useState(null); //app access token
    const [start, setStart] = useState(null); //start artist object
    const [end, setEnd] = useState(null); //end artist object
    const [middle, setMiddle] = useState([]); //array of artist objects between start and end in order
    const [current, setCurrent] = useState(null); //current artist being explored. null if done or not begun
    const currentRef = useRef(current); //used for referencing current in message hook
    const [songList, setSongList] = useState([]); // list of songs for results playlist
    const [message, setMessage] = useState(''); // messages displayed during search
    const api = new SpotifyWebApi();

    // On load, generate a new token
    useEffect(() => {
        authorize().then((data) => setToken(data));
    }, [])

    // When the token is loaded, find the closest artist to the provided name
    useEffect(() => {
        if (token) {
            api.setAccessToken(token.access_token);
            api.searchArtists(startName)
                .then(response => setStart(response.artists.items[0]))
                .catch(err => alert("start not found"));
            api.searchArtists(endName)
                .then(response => setEnd(response.artists.items[0]))
                .catch(err => alert("end not found"));
        }
    }, [token])

    // When start and end artists are found, set periodic messages and begin the search
    useEffect(() => {
        if (start && end) {
            setTimeout(() => {if (currentRef) {setMessage(`Searching for ${end.name} starting with ${start.name}'s related artists`)}}, 3000);
            setTimeout(() => {if (currentRef) {setMessage(`Artist relations don't always go both ways, so the shortest path from ${start.name} to ${end.name} could be very different from the shortest path from ${end.name} to ${start.name}.`)}}, 15000);
            setTimeout(() => {if (currentRef) {setMessage("The speed of this app is limited by the number of API calls it makes. If your artists are far apart, there could be thousands of other artists to search first.")}}, 30000);
            runSearch();
        }
    }, [start, end])

    // When the search completes, generate the song list
    useEffect(() => {
        if (middle.length > 0) {
            runSongListGeneration();
            setMessage('')
        }
    }, [middle])

    // Generate a list of songs based on an artist list
    const runSongListGeneration = async () => {
        setSongList(await generateSongList(middle, api));
    }

    // Execute the related artist BFS search 
    const runSearch = async () => {
        setMiddle(await searchRelated(start, end, api, setCurrent));
        setMessage('');
    }

    return (
        <div className="traverser">
            <div className="search">
                { start && end ? //display start and end artist info once loaded
                    <div className="results">
                        <Artist artistInfo={start}/>
                        <hr></hr>
                        <div className="middle-wrapper">
                            {current ? //show exploration status while searching
                                <div id="current">
                                    <h4>Currently Exploring:</h4>
                                    <h4>{current.artist.name}</h4>
                                    { message === '' ? //display periodic messages
                                        null :
                                        <p id="message">{message}</p>
                                    }
                                </div>:
                                middle.slice(1, -1).map((artist) => <Artist key={artist.id} artistInfo={artist.artist}/>)}
                        </div>
                        <hr></hr>
                        <Artist artistInfo={end}/>
                    </div>:
                    <p>Loading...</p>
                }
            </div>
            {songList.length > 0 ? // Display button for adding playlist once ready
                <Playlist songList={songList} /> :
                null
            }
        </div>
    )
}

export default Traverser



