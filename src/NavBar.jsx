import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import AccountContext from "./AccountContext";
import SearchBarMovieCards from './SearchBarMovieCards.jsx'
import './App.css'
import { genres } from './assets/genres';

const NavBar = ({searchText, setSearchText, setQuery, setConfirm, showResults, setGenreType}) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);  // Create a ref for the dropdown
  const inputRef = useRef(null);      // Create a ref for the input
  const submitButtonRef = useRef(null); // Create a ref for the submit button

  const currentUser = localStorage.getItem('loggedInUserName');
  console.log(currentUser)
  
  const context = useContext(AccountContext);
  const {getSession, logout} = context;

  const logOut = () => {
    logout()
    .then(data => {
      console.log("Logged out successfully")
    })
    .catch(err => {
      console.log(err);
    })
    navigate('/');
  }

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the /login route
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(e.target) &&
      inputRef.current && 
      !inputRef.current.contains(e.target) &&
      submitButtonRef.current && 
      !submitButtonRef.current.contains(e.target)
    ) {
      setIsDropdownVisible(false);  // Hide the dropdown if the click is outside
    }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);  // Add the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Cleanup the event listener
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

  /*const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 300);
  };*/

  const capitalizeWords = (str) => {
    if (!str) return str;
    return str
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words back into a string
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
            { currentUser ? (
              <>
                <li className="nav-item dropdown d-none d-lg-flex">
                  <div className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 'bold' }}>
                    Hi, {capitalizeWords(currentUser)}
                  </div>
                  <div className="dropdown-menu" style= {{right: '0', left: 'auto'}} aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" type="button" onClick={logOut}>Log Out</button>
                  </div>
                </li>
                <li className="nav-item dropdown d-block d-lg-none">
                  <div className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 'bold' }}>
                    Hi, {capitalizeWords(currentUser)}
                  </div>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" type="button" onClick={logOut}>Log Out</button>
                  </div>
                </li>  
              </>             
              ) : (
                <div>
                  <li className="nav-item d-block d-lg-none">
                    <Link className="nav-link active" aria-current="page" to="/Login" style={{ fontWeight: 'bold' }}>Log In / Register</Link>
                  </li>
                  <button 
                  className="btn btn-outline-dark ms-2 d-none d-lg-flex"       
                  type="button" // Change the type to 'button' to prevent form submission
                  onClick={handleLoginClick}>
                      Log In / Register
                  </button>
                </div>
              )}
          </div>
        </div>
      </nav>
      <div className='mt-3 mb-4 ms-2 me-2'>
        <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
          <div className="dropdown flex-grow-1" ref={dropdownRef}>
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
                //onBlur={handleBlur}
              />
              {isDropdownVisible && searchText !== '' && showResults.length > 0 && (
                <ul
                  className="dropdown-menu show w-100 p-0"
                  aria-labelledby="navbarDropdown"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '10px 0',
                  }}
                >
                  <div
                    className="d-flex flex-wrap justify-content-start"
                  >
                    {showResults.map((result, index) => (
                      <div key={index} className="col-12 col-lg-4">
                        <Link
                          to={`/movie/${result.id}`}
                          className="dropdown-item p-0"
                          onClick={() => {
                            setIsDropdownVisible(false);
                            setSearchText('');
                          }}
                        >
                          <SearchBarMovieCards movie={result} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </ul>
              )}
          </div>
          <button className="btn btn-outline-dark ms-3" type="submit" ref={submitButtonRef}>Search</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default NavBar;
