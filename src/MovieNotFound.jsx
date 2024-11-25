import Hero from './HeroSection'
import Footer from './Footer';

const MovieNotFound = () => {
    return (
        <div className='container px-3'>
            <Hero text = "Error.... ID not found" />
            <Footer/>
        </div>
        
    );
}

export default MovieNotFound;