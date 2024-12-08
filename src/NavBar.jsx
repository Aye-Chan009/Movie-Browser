import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SearchBarMovieCards from './SearchBarMovieCards.jsx'
import './App.css'
import { genres } from './assets/genres';

const NavBar = ({searchText, setSearchText, setQuery, setConfirm, showResults, setGenreType}) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        submitButtonRef.current &&
        !submitButtonRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setIsDropdownVisible(true);
  };

  const updateSearchText = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuery(searchText);
      setConfirm(true);
      navigate('/search');
      setSearchText('');
      setIsDropdownVisible(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchText);
    setConfirm(true);
    navigate('/search');
    setSearchText('');
    setIsDropdownVisible(false); 
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  return (
    <div className="bg-light">
    <div className='container p-0'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/" style={{ fontWeight: 'bold' }}>Movie Browser <div className="fs-6">by Aye Chan</div></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ whiteSpace: 'nowrap' }}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/TopRatedMovies" style={{ fontWeight: 'bold' }}>Top Rated Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/PopularCurrently" style={{ fontWeight: 'bold' }}>Popular Currently</Link>
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 'bold' }}>
                  Genres
                </div>
                <ul
                  className="dropdown-menu"
                  style={{
                    padding: '10px',
                    minWidth: '200px', // Ensure dropdown is wide enough to accommodate grid
                  }}
                  aria-labelledby="dropdownMenuButton"
                >
                  <div
                    className="dropdown-menu-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
                      gap: '10px', // Add space between items
                    }}
                  >
                    {genres.map((genre) => (
                      <li key={genre.id} style={{ listStyleType: 'none' }}>
                        <Link 
                          className="dropdown-item" 
                          to={`/movies/${genre.name}`} 
                          onClick={() => { setGenreType(genre); }}>
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
            </ul>
            <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
              <div className="dropdown flex-grow-1" style={{maxWidth: '380px'}} ref={dropdownRef}>
                <input
                    ref={inputRef}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Movies Here"
                    aria-label="Search"
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={updateSearchText}
                    onFocus={handleFocus} 
                  />
                  {isDropdownVisible && searchText !== '' && showResults.length > 0 && (
                    <ul className="dropdown-menu show" aria-labelledby="navbarDropdown" style={{maxHeight: '300px', overflowY: 'auto'}}>
                      {showResults.map((result, index) => (
                          <li key={index}>
                            <Link
                              to={`/movie/${result.id}`}
                              className="dropdown-item p-0"
                              onClick={() => { setIsDropdownVisible(false); setSearchText(''); }}>
                                <SearchBarMovieCards movie={result} />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
              <button ref={submitButtonRef} className="btn btn-outline-dark ms-2" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
    </div>
  )
}

export default NavBar;
