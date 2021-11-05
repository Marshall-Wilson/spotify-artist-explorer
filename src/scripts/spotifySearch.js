import BfsArtist from './BfsArtist'
import SpotifyWebApi from 'spotify-web-api-js'


//returns an app authorization token 
export const authorize = () => {
    return new Promise((resolve, reject) => {
        const data = { grant_type: 'client_credentials' };
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from('d4c2fd522b164d169533cc916f7c5d27:fcd4680273bc464ab3524d0ce93bf654').toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        }).then((response) =>
            response.json().then((data) =>
                resolve(data)
            )
        ).catch((e) =>
            reject(e)
        );
    })
}


//performs a BFS to find a path from the 'start' artist to the 'end' artist
//using related artists as neighbors. Returns an array of artists from start to end.
export const searchRelated = async(start, end, api, setCurrent) => {
    let tbd = [new BfsArtist(start, null, null)];
    let visited = [];
    let curr = null;
    console.log(new Date());
    while (!isIn(end.id, tbd) && tbd.length > 0) {
        curr = tbd.shift();
        setCurrent(curr);
        visited.push(curr);
        let newRelateds = await getAllRelateds(curr, api);
        newRelateds.forEach((related) => {
            if (!isIn(related.id, tbd) && !isIn(related.id, visited)) {
                tbd.push(related);
            }
        })
    }

    const foundEnd = tbd.find((elmt) => elmt.id === end.id);

    const path = foundEnd.getPredecessors();

    setCurrent(null);
    console.log(new Date());
    return path.reverse();
}


//return the related artists of an artist(both in BfsArtist format) when resolved
const getAllRelateds = (artist, api) => {
    return new Promise((resolve, reject) => {
        api.getArtistRelatedArtists(artist.id)
            .then((response) => {
                resolve(response.artists.map(newArtist => {
                    return new BfsArtist(newArtist, artist, null);
                }));
            })
    })
}


//perform BFS of artists who collaborated on songs
//deprecated/replaced with searchRelateds
export const searchCollabs = async(start, end, api) => {
    let tbd = [new BfsArtist(start, null, null)];
    let visited = [];
    let curr = null;

    while (!isIn(end.id, tbd) && tbd.length > 0) {
        curr = tbd.shift();
        visited.push(curr);
        let newCollabs = await getAllCollaborators(curr, api);
        newCollabs.forEach((collab) => {
            if (!isIn(collab.id, tbd) && !isIn(collab.id, visited)) {
                tbd.push(collab);
            }
        })
    }
    const foundEnd = tbd.find((elmt) => elmt.id === end.id);
    const path = foundEnd.getPredecessors();
    return path
}


// given an artist and authorized api, returns a set of artists who have collaborated on songs with the original artist
// deprecated/replaced with getAllRelateds
const getAllCollaborators = (artist, api) => {
    return new Promise((resolve, reject) => {
        let collaborators = [];
        api.getArtistAlbums(artist.id)
            .then((albums) => {
                let promises = [];
                albums.items.forEach(album => {
                    promises.push(getAlbumCollaborators(artist, album, api)
                        .then((albumCollaborators) => {
                            albumCollaborators.forEach(collab => {
                                if (!isIn(collab.id, collaborators)) {
                                    collaborators.push(collab);
                                }
                            })
                        })
                    )
                })
                Promise.all(promises).then((data) => {
                    resolve(collaborators)
                });
            })
            .catch((err) => reject(err));
    })
}


//given an artist and album, returns a list of unique artists who also wrote songs on the album
const getAlbumCollaborators = (artist, album, api) => {
    return new Promise((resolve, reject) => {
        let collaborators = [];
        api.getAlbumTracks(album.id)
            .then((tracks) => {
                tracks.items.forEach((track) => {
                    if (track.artists.length > 1) {
                        track.artists.forEach((newArtist) => {
                            if (!isIn(newArtist.id, collaborators) && newArtist.id !== artist.id) {
                                collaborators.push(new BfsArtist(newArtist, artist, track));
                            }
                        })
                    }
                })
                resolve(collaborators);
            })
            .catch((err) => reject(err));
    })
}


//given a list of artists in BfsArtist format and an authorized api
//returns an array of spotify song objects (one per artist in the same order)
export const generateSongList = (artistList, api) => {
    return new Promise(async(resolve, reject) => {
        const songList = []
        for (let i = 0; i < artistList.length; i++) {
            await api.getArtistTopTracks(artistList[i].id, "US")
                .then((topTracks) => {
                    songList.push(topTracks.tracks[0]);
                })
                .catch((err) => reject(err));
        }
        resolve(songList);
    })
}

//finds whether a given id is in a list of BfsArtist objects
const isIn = (id, list) => {
    return (list.findIndex((elmt) => elmt.id === id) !== -1);
}

//given a Spotify user access token, creates a playlist for the 
//user from a list of song id's
export const generatePlaylist = async(token, songList) => {
    const api = new SpotifyWebApi();
    api.setAccessToken(token);
    const user = await api.getMe();
    const playlist = await api.createPlaylist(user.id, { name: 'Degrees of Separation', public: false, collaborative: false, description: 'Several degrees of spotify exploration' });
    await api.addTracksToPlaylist(playlist.id, songList.map((songId) => "spotify:track:" + songId));
    return playlist.id;
}