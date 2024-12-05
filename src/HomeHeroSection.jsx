import './App.css';

const HomeHero = () => {
    return (
        <div className="bg-dark">
            <div className="container p-0">
                <div className="homeHeroSectionContainer bg-dark text-white pt-4 pb-3 m-0 px-3">
                    
                    <h1 className="text" 
                        style={{ 
                            margin: '0', 
                            fontSize: '2.5rem', 
                            fontWeight: '700', 
                            letterSpacing: '2px',
                            color: '#f9a825'
                        }}>
                        Welcome to My Movie Browser!
                    </h1>
                    
                    <p className="text" 
                        style={{ 
                            marginTop: '20px', 
                            fontSize: '1.1rem', 
                            lineHeight: '1.6', 
                            color: '#e0e0e0', 
                            maxWidth: '750px', 
                            marginLeft: 'auto', 
                            marginRight: 'auto'
                        }}>
                        This is a personal project built with React and the TMDb API. While you can’t watch full movies here, you can explore trending films, see what’s playing now, and watch official trailers.<br/> 
                        <strong> Stay tuned for more features coming soon!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeHero;
