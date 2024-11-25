import MovieCards from './MovieCards.jsx'

const Carousel = ({ chunkedMovies =[], chunkedTrailer=[] }) => {

    return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000" style={{maxHeight :"auto"}}>
                {chunkedMovies.length > 0 ? (
                    <>
                    <div className="carousel-inner">
                        {chunkedMovies.map((chunk, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                {/* For large screens, use d-flex */}
                                <div className="d-none d-lg-flex justify-content-center align-items-center">
                                    {chunk.map((movie, movieIndex) => (
                                        <div key={movieIndex} style={{margin:"3rem"}}>
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
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> 
                    </>
                    ) : chunkedTrailer.length > 0 ? (
                    <>
                    <div className="carousel-inner">
                        {chunkedTrailer.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? 'active' : ''}`}>
                            <div className="d-none d-lg-flex justify-content-center align-items-center">
                            {chunk.map((trailer, trailerIndex) => (
                                <div key={trailerIndex}>
                                {/* Render trailerId (not id) */}
                                {trailer.trailerId ? (
                                <iframe
                                    width="100%"
                                    height="auto"
                                    src={`https://www.youtube.com/embed/${trailer.trailerId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                ) : (
                                <p>No trailer available</p>
                                )}
                            </div>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> 
                    </>
                    ) : (
                        <p>Loading Today's Trending Movies...</p> 
                    )}
            </div>
    )
}

export default Carousel;