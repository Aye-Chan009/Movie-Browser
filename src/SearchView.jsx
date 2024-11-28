import Hero from './HeroSection'
import MovieCard from './MovieCards.jsx'
import Footer from './Footer';
//import MovieDetail from './MovieDetails.jsx'

const SearchView = ({ keyword, searchResults }) => {
    const searchTitle = `Searching for ${keyword}`;
    let resultsHTML = 'Found Nothing';

    if (searchResults && searchResults.length > 0) {
        resultsHTML = searchResults.map((movie, index) => {
            return (
                <div key={index} className="col-lg-3 mb-4">
                    <MovieCard movie={movie} />
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
            <Footer/>
        </div>
    );
}

export default SearchView;
  