import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SearchBarMovieCards from './SearchBarMovieCards.jsx'

//still need to do Searchbar
//go to details page from searchbar
//make the searchbar long in full screen


const NavBar = ({searchText, setSearchText, setQuery, setConfirm, showResults}) => {
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
        setSearchText('');
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

  /*const handleSuggestionClick = (e) => {
    setSearchText(e);
    setQuery(e);
    setConfirm(true);
    navigate('/search');
    setIsDropdownVisible(false); 
  };*/

  /*const handleBlur = () => {
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setIsDropdownVisible(false);
      }
    }, 100);
  };*/

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1" to="/">Movie Browser <div className="fs-6">by Aye Chan</div></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
            <div className="dropdown flex-grow-1" style={{maxWidth: '546px'}} ref={dropdownRef}>
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
                <ul className="dropdown-menu show" 
                style={{
                  width: '100%',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'}}
                aria-labelledby="navbarDropdown">
                {showResults.map((result, index) => (
                    <li key={index}>
                      {/*<button
                        className="dropdown-item"
                        style={{
                          width: '100%',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'}}
                        onClick={() => handleSuggestionClick(result.id)}
                      >
                        <SearchBarMovieCards movie={result} />
                      </button>*/}
                      <Link
                        to={`/movie/${result.id}`}
                        className="dropdown-item"
                        onClick={() => { setIsDropdownVisible(false); setSearchText(''); }}
                        //onClick={() => alert("success")} 
                      >
                        <SearchBarMovieCards movie={result} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button ref={submitButtonRef} className="btn btn-outline-success ms-2" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
