import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import { Routes, Route } from 'react-router-dom'
import SearchView from './SearchView.jsx'
import { useState,useEffect } from 'react'

function App() {

  const [searchResults, setSearchResults] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText("something");
    setSearchResults("Found Something")
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" 
          element={
            <SearchView 
              keyword={searchText} 
              searchResults={searchResults}
            />} 
        />
      </Routes>
    </div>
  )
}

export default App
