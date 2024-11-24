import './App.css';

const Hero = ({text, backdrop}) => {
    return (
        <div className="container p-0">
            <div className="backdropContainer bg-dark text-white py-5 px-3">
                <h1 className="text">{text}</h1>
                {backdrop&&
                    <div className="backdrop" style={{backgroundImage: `url(${backdrop})` }}></div>
                }
            </div>
        </div>
    
    );
}

export default Hero;