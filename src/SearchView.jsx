import Hero from './HeroSection'
import MovieCard from './MovieCards.jsx'
//import MovieDetail from './MovieDetails.jsx'

const SearchView = ({ keyword, searchResults }) => {
    const searchTitle = `Searching for ${keyword}`;
    let resultsHTML = 'Found Nothing';

    if (searchResults && searchResults.length > 0) {
        resultsHTML = searchResults.map((obj, i) => {
            return (
                <div key={i} className="col-lg-3 mb-4">
                    <MovieCard movie={obj} />
                    {/*<MovieDetail movie={obj} />*/}
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
  