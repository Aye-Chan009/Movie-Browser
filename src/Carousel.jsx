import MovieCards from './MovieCards.jsx';
import React, { useEffect } from 'react';

const Carousel = ({ chunkedMovies = [], Trailer = [] }) => {

   useEffect(() => {
        const carouselElement = document.querySelector('#carouselExampleFadeMovies');
        if (carouselElement) {
            // Initialize the carousel manually using Bootstrap's Carousel constructor
            const carousel = new window.bootstrap.Carousel(carouselElement, {
                interval: 4000, // Set the interval if needed
                ride: 'carousel', // Make sure it auto-rotates
            });
            carousel.cycle(); // Start the carousel
        }

        const carouselTrailers = document.querySelector('#carouselExampleFadeTrailers');
        if (carouselTrailers) {
            // Initialize the carousel for Trailers manually
            const carousel = new window.bootstrap.Carousel(carouselTrailers, {
                interval: 4000, // Set the interval for trailer carousel
                ride: 'carousel', // Make sure it auto-rotates
            });
            carousel.cycle(); // Start the carousel
        }
        
    }, []);

    return (
        <div>
            {/* Movie Carousel */}
            {chunkedMovies.length > 0 ? (
                <div
                    id="carouselExampleFadeMovies"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                >
                    
                    <div className="carousel-inner">
                        {chunkedMovies.map((chunk, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                {/* For large screens, use d-flex */}
                                <div className="d-none d-lg-flex justify-content-center align-items-center">
                                    {chunk.map((movie, movieIndex) => (
                                        <div key={movieIndex} style={{ margin: "1rem" }}>
                                            <MovieCards movie={movie} />
                                        </div>
                                    ))}
                                </div>

                                {/* For small screens, use d-block */}
                                <div className="d-block d-lg-none justify-content-center align-items-center">
                                    {chunk.map((movie, movieIndex) => (
                                        <div key={movieIndex}>
                                            <MovieCards movie={movie} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="carousel-indicators mt-3">
                        <a className="carousel-control-prev" href="#carouselExampleFadeMovies" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'brightness(0) opacity(1)' }}></span>
                        </a>
                        {chunkedMovies.map((chunk, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleFadeMovies"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                                style={{
                                    backgroundColor: index === 0 ? '#555' : '#333', // Active and inactive button colors
                                }}
                            ></button>
                        ))}
                        <a className="carousel-control-next" href="#carouselExampleFadeMovies" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'brightness(0) opacity(1)' }}></span>
                        </a>
                    </div>
                </div>
            ) : null}

            {/* Trailer Carousel */}
            {Trailer.length > 0 ? (
                <div
                    id="carouselExampleFadeTrailers"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        {Trailer.map((trailerPair, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                {/* For large screens, use d-flex */}
                                <div className="d-none d-lg-flex justify-content-center align-items-center">
                                    {trailerPair.map((trailer, trailerIndex) => (
                                        <div
                                            key={trailerIndex}
                                            style={{
                                                position: 'relative',
                                                width: '48%',
                                                //height: '0',
                                                paddingBottom: '27%',
                                                margin: '1%',
                                            }}
                                        >
                                            <iframe
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                }}
                                                src={`https://www.youtube.com/embed/${trailer.trailerKey}`}
                                                title={`Trailer for movie ${trailer.movieId}`}
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* For small screens, use d-block */}
                                <div className="d-block d-lg-none justify-content-center align-items-center">
                                    {trailerPair.map((trailer, trailerIndex) => (
                                        <div key={trailerIndex} 
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '0',
                                                paddingBottom: '56.25%',
                                                marginBottom: "0.5rem"
                                                
                                            }}>
                                            <iframe
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                }}
                                                src={`https://www.youtube.com/embed/${trailer.trailerKey}`}
                                                title={`Trailer for movie ${trailer.movieId}`}
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="carousel-indicators mt-3">
                        <a className="carousel-control-prev" href="#carouselExampleFadeTrailers"  role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'brightness(0) opacity(1)' }}></span>
                        </a>
                        {Trailer.map((trailerPair, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleFadeTrailers"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                                style={{
                                    backgroundColor: index === 0 ? '#555' : '#333', // Active and inactive button colors
                                }}
                            ></button>
                        ))}
                        <a className="carousel-control-next" href="#carouselExampleFadeTrailers" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'brightness(0) opacity(1)' }}></span>
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Carousel;
