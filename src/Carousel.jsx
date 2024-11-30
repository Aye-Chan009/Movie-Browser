import MovieCards from './MovieCards.jsx';

const Carousel = ({ chunkedMovies = [], Trailer = [] }) => {

    return (
        <div>
            {/* Movie Carousel */}
            {chunkedMovies.length > 0 ? (
                <div
                    id="carouselExampleFadeMovies"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                    style={{ maxHeight: "auto" }}
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
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFadeMovies"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFadeMovies"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : null}

            {/* Trailer Carousel */}
            {Trailer.length > 0 ? (
                <div
                    id="carouselExampleFadeTrailers"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                    style={{ maxHeight: "auto" }}
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
                                                margin: "1%",
                                            }}>
                                            <iframe
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 'none',
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
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFadeTrailers"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFadeTrailers"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Carousel;
