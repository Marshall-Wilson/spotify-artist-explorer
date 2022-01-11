import React from 'react'
import Nav from './components/Nav'
import ArtistExplorer from './components/ArtistExplorer'
import About from './components/About'
import Footer from './components/Footer'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

// Top level container controlling whether the app displays the main page or the about page
const ExplorerContainer = () => {

    return (  
        <Router className="Router">
            <Nav />
            <Routes>
                <Route path="/" element={<ArtistExplorer/>} />
                <Route path="/about" element={<About/>} />
                <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default ExplorerContainer
