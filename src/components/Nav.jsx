import React from 'react'

const Nav = ({clickHandler}) => {
    return (
        <div className="nav">
            <h1>Spotify Artist Explorer</h1>
            <div className="nav-links">
                <h2 onClick={() => clickHandler('main')}>Main</h2>
                <h2 onClick={() => clickHandler('about')}>About</h2>
            </div>
        </div>
    )
}

export default Nav
