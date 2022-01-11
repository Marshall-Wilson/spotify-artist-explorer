import React from 'react'
import {Link} from 'react-router-dom'

//explorer nav bar
const Nav = () => {
    return (
        <div className="nav">
            <Link to="/">
                <h1>Spotify Artist Explorer</h1>
            </Link>
            <div className="nav-links">
                <Link to='/'>Main</Link>
                <Link to='/about'>About</Link>
            </div>
        </div>
    )
}

export default Nav
