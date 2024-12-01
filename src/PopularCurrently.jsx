import Hero from "./HeroSection"
import MovieCard from './MovieCards.jsx'

const PopularCurrently = ({ Movies, heroText }) => {

    let resultsHTML = 'Found Nothing';

    if (Movies && Movies.length > 0) {
        resultsHTML = Movies.map((movie, index) => {
            return (
                <div key={index} className="col-lg-3 mb-4">
                    <MovieCard movie={movie} />
                </div>
            )
        });
    }

    return (
        <div>
            <Hero text = {heroText} />
            <div id="services" className="container py-5">
                <div className="row">
                    {resultsHTML}
                </div>
            </div>
        </div>
    );
}
  
  export default PopularCurrently;
  