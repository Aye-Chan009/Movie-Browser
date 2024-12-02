import Hero from './HeroSection'
import MovieCard from './MovieCards.jsx'

const SearchView = ({ keyword, searchResults }) => {
    const searchTitle = `Search Result for:  ${keyword}`;
    
    let resultsHTML = (
        <div className="col-12 text-center py-5">
            <i className="fas fa-search fa-3x mb-3" style={{ color: '#888' }}></i> {/* Optional icon */}
            <h3 style={{ color: '#555' }}>Oops! We couldn't find any results for "{keyword}".</h3>
            <p style={{ color: '#888', fontSize: '1.2rem' }}>
                Please try again with a different keyword or check for typos.
            </p>
            <p style={{ color: '#888', fontSize: '1rem' }}>No worries, the movie you're looking for might not be listed yet!</p>
        </div>
    );

    if (searchResults && searchResults.length > 0) {
        resultsHTML = searchResults.map((movie, index) => {
            return (
                <div key={index} className="col-lg-3 mb-4">
                    <MovieCard movie={movie} />
                </div>
            )
        });
    }

    return (
        <div>
            <Hero text = {searchTitle} />
            <div id="services" className="container py-5">
                <div className="row">
                    {resultsHTML}
                </div>
            </div>
        </div>
    );
}

export default SearchView;
  