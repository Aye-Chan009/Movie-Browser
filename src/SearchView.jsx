import Hero from './HeroSection'

const SearchView = ({keyword, searchResults}) => {

    const searchTitle = `Searching for ${keyword}`
    const formattedResults = JSON.stringify(searchResults, null, 2);
    
    return (
        <div>
            <Hero text = {searchTitle} />
            <div id="services" className="container py-5">
                <h2>Search Result</h2>
                <div>
                    <pre>{formattedResults}</pre>
                </div>
            </div>
        </div>
    );
}

export default SearchView;
  