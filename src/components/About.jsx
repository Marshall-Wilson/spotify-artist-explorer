import React from 'react'

const About = () => {
    return (
        <div className="about">
            <h1>About</h1>
            <p>This project was meant to translate a <a href="https://github.com/Marshall-Wilson/collaboration-explorer">
                previous C++ project</a>,
             which explored pre-establishes networks of artists and collaborations,
              into the real world by incorporating the Spotify API</p>
            <p>The app implements a breadth-first search of Spotify's related artists
                 feature, searching first through the related artists of the starting
                 artist, then through those artists' related artists, and so on
                 until it finds the ending artist.
            </p>
            <p>Due to the Spotify API's rate limiting and the average API response time,
                the current version of this app has a hard time dealing with artists
                more than a few steps apart. If you're just looking to try out the
                app, I recommend using artists in similar genres, well-known artists,
                or some of the suggestions below.
            </p>
            <ul>
                <li><strong>Hozier to Iron and Wine</strong>: <p>⁃ 2 steps, 1 second</p></li>
                <li><strong>Joni Mitchell to Bob Dylan</strong>: <p>⁃ 3 steps, 6 seconds</p></li>
                <li><strong>Dolly Parton to Chicago</strong>: <p>⁃ 4 steps, 30 seconds</p></li>
                <li><strong>Carly Rae Jepsen to Nicki Minaj</strong>: <p>⁃ 5 steps, 3 minutes</p></li>
                <li><strong>Frank Sinatra to Kermit the Frog</strong>: <p>⁃ 7 steps, 7 minutes</p></li>
            </ul>
        </div>
    )
}

export default About
