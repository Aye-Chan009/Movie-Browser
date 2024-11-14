import Hero from './HeroSection'

const SearchView = ({keyword, searchResults}) => {

    const searchTitle = `Searching for ${keyword}`
    
    return (
        <div>
            <Hero text = {searchTitle} />
            <div id="services" className="container py-5">
                <h2>Search Result</h2>
                <p>{searchResults}</p>
            </div>
        </div>
    );
}

export default SearchView;
  