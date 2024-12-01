import Hero from './HeroSection'
import MovieCard from './MovieCards.jsx'

const SearchView = ({ keyword, searchResults }) => {
    const searchTitle = `Search Result for:  ${keyword}`;
    let resultsHTML = 'Found Nothing';

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
  