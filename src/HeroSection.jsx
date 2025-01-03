import './App.css';

const Hero = ({text}) => {
    return (
        <div className="bg-dark">
        <div className="container p-0">
            <div className="backdropContainer text-white py-5 px-3">
                <h1 className="text text-center">{text}</h1>
            </div>
        </div>
        </div>
    
    );
}

export default Hero;