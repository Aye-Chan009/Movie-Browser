import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SearchBarMovieCards from './SearchBarMovieCards.jsx';
import './App.css';
import { genres } from './assets/genres';
//import { Auth } from '@aws-amplify/auth';
//import { Amplify, Auth } from 'aws-amplify';

//console.log(Auth);

const NavBar = ({ searchText, setSearchText, setQuery, setConfirm, showResults, setGenreType, user, onLogOut, onLogin }) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the click happened outside the search area
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //const user = await Auth.signIn(username, password); // Cognito sign in
      setUser(user); // Set the user state with the signed-in user
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Handle registration (could navigate to a registration page)
  const handleRegister = () => {
    navigate('/register'); // Redirect to a registration page
  };

  const handleLogOut = async () => {
    // Call the onLogOut prop to handle log out functionality
    try {
      //await Auth.signOut(); // Cognito sign out
      setUser(null); // Reset user state
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-light">
      <div className="container p-0">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1" to="/" style={{ fontWeight: 'bold' }}>
              Movie Browser <div className="fs-6">by Aye Chan</div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ whiteSpace: 'nowrap' }}>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/TopRatedMovies" style={{ fontWeight: 'bold' }}>
                    Top Rated Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/PopularCurrently" style={{ fontWeight: 'bold' }}>
                    Popular Currently
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <div
                    className="nav-link active dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontWeight: 'bold' }}
                  >
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
                            onClick={() => {
                              setGenreType(genre);
                            }}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
                
                <li className="nav-item dropdown">
                  <div
                    className="nav-link active dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontWeight: 'bold' }}>
                    {user ? `Hello, ${user.username}` : 'Log In/Register'}
                  </div>

                  <div className="dropdown-menu p-3">
                    {!user ? (
                        <form className="form-horizontal p-3" method="post" acceptCharset="UTF-8" onSubmit={handleLogin}>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Username
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="form-control"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-100 mb-2">
                            Log In
                          </button>
                          <div className="text-center">
                            <button onClick={handleRegister} className="btn btn-link">
                              Don't have an account? Register here
                            </button>
                          </div>
                        </form>
                      ) : (
                        <ul className="dropdown-menu" style={{ position: 'absolute', right: '0' }}>
                          <li>
                            <Link className="dropdown-item" to={`/profile/${user.username}`}>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={handleLogOut}>
                              Log Out
                            </button>
                          </li>
                        </ul>
                      )}
                  </div>
                </li>
              </ul>


              <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
                <div className="dropdown flex-grow-1" style={{ maxWidth: '380px' }} ref={dropdownRef}>
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
                    <ul
                      className="dropdown-menu show"
                      aria-labelledby="navbarDropdown"
                      style={{ maxHeight: '300px', overflowY: 'auto' }}
                    >
                      {showResults.map((result, index) => (
                        <li key={index}>
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
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button ref={submitButtonRef} className="btn btn-outline-dark ms-2" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
