import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import PopularCurrently from './PopularCurrently.jsx'
import MovieDetails from './MovieDetails.jsx'
import MovieNotFound from './MovieNotFound.jsx'
import Hero from './HeroSection'
import Footer from './Footer'
import { Routes, Route } from 'react-router-dom'
import SearchView from './SearchView.jsx'
import { useState,useEffect } from 'react'
const accessKey = import.meta.env.VITE_Access_Key;

function App() {

  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [popularMovies, setPopularMovies] = useState([])
  const [TopRatedMovies, setTopRatedMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [loadingGenre, setLoadingGenre] = useState(false); 

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessKey}`
    }
  };

  useEffect(() => {
    if (!searchText) return;
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchText)}&include_adult=false&language=en-US&page=1`, options)
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

    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options)
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
  }, [confirm]);

  useEffect(() => {
    if (!genreType) return;

    setLoadingGenre(true);
    
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genreType.id}`, options)
    .then(res => res.json())
    .then(data => {
        if (data && data.results) {
        setGenreMovie(data.results);
        } else {
        setGenreMovie([]);
        }
    })
    .catch(err => console.error(err))
    .finally(() => setLoadingGenre(false));
  }, [genreType]);

  useEffect(() => {
    
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&include_adult=false&page=1', options)
      .then(res => res.json())
      .then(data => {
        if (data && data.results) {
          setPopularMovies(data.results);
        } else {
          setPopularMovies([]);
        }
      })
      .catch(err => console.error('Fetch error:', err));
      
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(res => res.json())
      .then(data => {
        if (data && data.results) {
          setTopRatedMovies(data.results);
        } else {
          setTopRatedMovies([]);
        }
      })
      .catch(err => console.error('Fetch error:', err));

  }, []);
  
  return (
    <div>
      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        setQuery={setQuery}
        setConfirm={setConfirm}
        showResults={showResults}
        setGenreType ={setGenreType}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TopRatedMovies"
          element={
            <PopularCurrently
              Movies={TopRatedMovies}
              heroText={"Top Rated Movies of all times"} 
            />}
        />
        <Route path="/PopularCurrently" 
          element={
            <PopularCurrently
              Movies={popularMovies}
              heroText={"Currently Popular Movies"}  
            />}
        />
        <Route path="/search" 
          element={
            <SearchView 
              keyword={query} 
              searchResults={searchResults}
            />} 
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-not-found" element={<MovieNotFound />} />
        <Route path="/movies/:genreName" 
          element={
            loadingGenre ? (
              <Hero text = "Loading Movies..." /> 
            ) : (
              <PopularCurrently Movies={genreMovie} heroText={`Movies with Genre Tag: ${genreType.name}`} />
            )
          }
        />
        <Route path="*" element={<MovieNotFound/>} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
