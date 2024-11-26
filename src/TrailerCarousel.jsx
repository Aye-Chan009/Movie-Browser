const TrailerCarousel = ({Trailer=[] }) => {
    console.log('Trailer Prop:', Trailer);
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000" style={{maxHeight :"auto"}}>
        {Trailer.length > 0 ? (
            <>
            <div className="carousel-inner">
                {Trailer.map((trailerPair, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        {/* For large screens, use d-flex */}
                        <div className="d-flex justify-content-center align-items-center">
                            {trailerPair.map((trailer, trailerIndex) => (
                                <div key={trailerIndex} style={{ position: 'relative', width: '40%', height: '300px', margin: '1%'}}>
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
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    />
                                </div>
                            ))}
                        </div>

                        {/* For small screens, use d-block */}
                        {/*<div className="d-block d-lg-none justify-content-center align-items-center">
                            {trailer.trailerKey && (
                                <div>
                                    <iframe
                                    width="auto"
                                    height="auto"
                                    src={`https://www.youtube.com/embed/${trailer.trailerKey}`}
                                    title={`Trailer for movie ${trailer.movieId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    />
                                </div>
                            )}
                        </div>*/}
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
                <p>Loading Today's Trending trailers...</p> 
            )}
        </div>
    )
}

export default TrailerCarousel;