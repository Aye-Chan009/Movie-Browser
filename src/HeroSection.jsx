import './HeroSection.css';

const Hero = ({text, backdrop}) => {
    return (
        <header className="container bg-dark text-white p-5">
            <h1 className="text">{text}</h1>
            {backdrop&&
                <div className="backdrop" style={{backgroundImage: `url(${backdrop})` }}></div>
            }

        </header>
    );
}

export default Hero;