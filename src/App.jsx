import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MovieDetails from './MovieDetails.jsx'
import MovieNotFound from './MovieNotFound.jsx'
import { Routes, Route } from 'react-router-dom'
import SearchView from './SearchView.jsx'
import { useState,useEffect } from 'react'
const apiKey = import.meta.env.VITE_API_KEY;

function App() {

  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchText)}&api_key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.results) {
          setShowResults(data.results);
        } else {
          setShowResults([]);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, [searchText]);

  useEffect(() => {
    if (!confirm) return;

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.results) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
      })
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setConfirm(false));
  }, [confirm, query]);
  
  return (
    <div>
      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        setQuery={setQuery}
        setConfirm={setConfirm}
        showResults={showResults}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" 
          element={
            <SearchView 
              keyword={query} 
              searchResults={searchResults}
            />} 
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-not-found" element={<MovieNotFound />} />
      </Routes>
    </div>
  )
}

export default App
