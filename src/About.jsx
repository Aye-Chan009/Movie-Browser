import Hero from "./HeroSection"
import Footer from './Footer';

const About = () => {
    
    return (
      <div>
          <Hero text = "About page Hero section" />
          <div id="services" className="container py-5">
                <h2>Our About</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita sint libero quae, unde magni nesciunt consequuntur, ipsam, velit laudantium provident deserunt. Soluta deleniti alias ad? Error praesentium repudiandae dolorum.</p>
          </div>
          <Footer/>
      </div>
    )
  }
  
  export default About;
  