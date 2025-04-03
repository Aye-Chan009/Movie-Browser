import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import PopularCurrently from './PopularCurrently.jsx'
import MovieDetails from './MovieDetails.jsx'
import MovieNotFound from './MovieNotFound.jsx'
import About from './About.jsx'
import Hero from './HeroSection'
import Footer from './Footer'
import Contact from './Contact.jsx'
import { useLocation, Routes, Route } from 'react-router-dom'
import SearchView from './SearchView.jsx'
import { useState,useEffect } from 'react'
const accessKey = import.meta.env.VITE_Access_Key;

function App() {

  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('');
  //const [confirm, setConfirm] = useState(false);
  const [popularMovies, setPopularMovies] = useState([])
  const [TopRatedMovies, setTopRatedMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [loadingGenre, setLoadingGenre] = useState(false); 
  const [page, setPage] = useState(1);  // Track current page for pagination
  const [pageTopRated, setPageTopRated] = useState(1); 
  const [pagePopular, setPagePopular] = useState(1); 
  const [pageSearch, setPageSearch] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);  // Track total number of pages for pagination
  const [totalPagesTopRated, setTotalPagesTopRated] = useState(1);
  const [totalPagesPopular, setTotalPagesPopular] = useState(1);
  const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  const location = useLocation()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessKey}`
    }
  };

  const limitTotalPages = (pages) => (pages > 500 ? 500 : pages);

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
    if (!query) return;

    const delayFetch = setTimeout(() => {

      fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${pageSearch}`, options)
      .then(res => res.json())
      .then(data => {
        if (data && data.results) {
          setSearchResults(data.results);
          const adjustedTotalPages = limitTotalPages(data.total_pages);
          setTotalPagesSearch(adjustedTotalPages); // Set total pages with limit
        } else {
          setSearchResults([]);
        }
      })
      .catch(err => console.error('Fetch error:', err))
      //.finally(() => setConfirm(false));

    }, 500)

    return () => clearTimeout(delayFetch);

  }, [query, pageSearch]);

  useEffect(() => {
    setPageSearch(1);  // Reset to page 1 when query changes
  }, [query]);

  useEffect(() => {
      setPage(1); 
      setPageTopRated(1);
      setPagePopular(1);
      setPageSearch(1);
  }, [location, genreType]);

  useEffect(() => {
    if (!genreType) return;

    setLoadingGenre(true);

    const delayFetch = setTimeout(() => {

      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_count.desc&with_genres=${genreType.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setGenreMovie(data.results); // Update genre movie list
          const adjustedTotalPages = limitTotalPages(data.total_pages);
          setTotalPages(adjustedTotalPages); // Set total pages with limit
        } else {
          setGenreMovie([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingGenre(false));

    }, 500);

    return () => clearTimeout(delayFetch);

  }, [genreType, page]);

  useEffect(() => {

    const delayFetch = setTimeout(() => {

      fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&include_adult=false&page=${pagePopular}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setPopularMovies(data.results); // Update movie list
          const adjustedTotalPages = limitTotalPages(data.total_pages);
          setTotalPagesPopular(adjustedTotalPages); // Set total pages with limit
        } else {
          setPopularMovies([]);
        }
      })
      .catch((err) => console.error('Fetch error:', err));

    }, 500);

    return () => clearTimeout(delayFetch);

  }, [pagePopular]);

  // Fetch top-rated movies with pagination
  useEffect(() => {

    const delayFetch = setTimeout(() => {

      fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageTopRated}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setTopRatedMovies(data.results); // Update movie list
          const adjustedTotalPages = limitTotalPages(data.total_pages);
          setTotalPagesTopRated(adjustedTotalPages); // Set total pages with limit
        } else {
          setTopRatedMovies([]);
        }
      })
      .catch((err) => console.error('Fetch error:', err));

    }, 500);

    return () => clearTimeout(delayFetch);

  }, [pageTopRated]);
  
  return (
    <div>
        <NavBar
          searchText={searchText}
          setSearchText={setSearchText}
          setQuery={setQuery}
          //setConfirm={setConfirm}
          showResults={showResults}
          setGenreType ={setGenreType}
        />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/TopRatedMovies"
          element={
            <PopularCurrently
              Movies={TopRatedMovies}
              heroText="Top Rated Movies of all times"
              currentPage={pageTopRated}
              totalPages={totalPagesTopRated}
              setPage={setPageTopRated}
            />
          }
        />
        <Route
          path="/PopularCurrently"
          element={
            <PopularCurrently
              Movies={popularMovies}
              heroText="Currently Popular Movies"
              currentPage={pagePopular}
              totalPages={totalPagesPopular}
              setPage={setPagePopular}
            />
          }
        />
        <Route path="/search" 
          element={
            <SearchView 
              keyword={query} 
              searchResults={searchResults}
              currentPage={pageSearch}
              totalPages={totalPagesSearch} 
              setPage={setPageSearch}
            />} 
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-not-found" element={<MovieNotFound />} />
        <Route
          path="/movies/:genreName"
          element={
            loadingGenre ? (
              <Hero text="Loading Movies..." />
            ) : (
              <PopularCurrently
                Movies={genreMovie}
                heroText={`Movies with Genre Tag: ${genreType.name}`}
                currentPage={page}
                totalPages={totalPages} 
                setPage={setPage}
              />
            )
          }
        />
        <Route path="*" element={<MovieNotFound/>} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
