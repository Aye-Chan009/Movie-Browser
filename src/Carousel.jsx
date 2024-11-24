import MovieCards from './MovieCards.jsx'

const Carousel =({popularMovie}) => {

    const chunkedMovies = [];
    for (let i = 0; i < popularMovie.length; i += 3) {
        chunkedMovies.push(popularMovie.slice(i, i + 3));
    }

    return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000" style={{maxHeight :"auto"}}>
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
            </div>
    )
}

export default Carousel;