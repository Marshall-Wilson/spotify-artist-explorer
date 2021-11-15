import React, {useState} from 'react'
import Nav from './components/Nav'
import ArtistExplorer from './components/ArtistExplorer'
import About from './components/About'
import Footer from './components/Footer'

// Top level container controlling whether the app displays the main page or the about page
const ExplorerContainer = () => {
    const [page, setPage] = useState('main');
    
    // returns the currently displayed component
    const GetPage = () => {
        if (page === 'main') {
            return <ArtistExplorer />
        } else if (page === 'about') {
            return <About />
        } else {
            return <p>Loading error: please refresh page</p>
        }
    }

    // Sets the current page choice. 'main' or invalid choices refresh page to base state
    const newPageChoice = (name) => {
        if (name === 'about') {
            setPage('about');
        } else {
            window.location.reload();
        }
    }

    return (
        <div class="explorer-container">
            <Nav clickHandler={newPageChoice}/>
            <GetPage />
            <Footer />
        </div>
    )
}

export default ExplorerContainer
