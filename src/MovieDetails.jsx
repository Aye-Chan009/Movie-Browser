import { useState, useEffect } from 'react';
import Hero from './HeroSection';
import { useParams, useNavigate } from 'react-router-dom';
const accessKey = import.meta.env.VITE_Access_Key;

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieDetail, setMovieDetail] = useState(null);
    const [castDetail, setCastDetail] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessKey}`,
        },
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        navigate('/movie-not-found');
                    }
                    throw new Error('Movie not found');
                }
                return res.json();
            })
            .then((data) => {
                setMovieDetail(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then((res) => res.json())
            .then((data) => {
                const actingCast = data.cast
                    .filter((person) => person.known_for_department === "Acting")
                    .slice(0, 5);  // Take the first 5
                setCastDetail(actingCast);
            })
            .catch((err) => {
                setError(err.message);
            });

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then((data) => {
                const trailers = data.results
                    .filter((video) => video.type === "Trailer")
                    .slice(0, 2);  // Take the first 2 trailers
                setTrailer(trailers);
            })
            .catch((err) => {
                setError(err.message);
            });

    }, [id, navigate]);

    if (isLoading) {
        return (
            <div>
                <Hero text="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Hero text={error} />
            </div>
        );
    }

    const posterUrl = movieDetail.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const backDropUrl = movieDetail.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const imdbURL = movieDetail.imdb_id ? `https://www.imdb.com/title/${movieDetail.imdb_id}` : 'No IMDB Link Found!!';
    const tmdbRating = movieDetail.vote_average ? `${movieDetail.vote_average}` : 'No Rating Yet';
    
    return (
      <div className="container p-0">
        <div className="top d-none d-lg-flex" style={{ backgroundImage: `url(${backDropUrl})` }}>
          <div className="moviedetail-overlay"></div> {/* Dark overlay for the background */}
          <div className="row w-100">
            <div className="col-md-3 d-flex justify-content-start">
              <div className="moviedetail-poster">
                <img
                  src={posterUrl}
                  alt={`Poster for ${movieDetail.original_title}`}
                  className="img-fluid shadow-lg rounded"
                />
                <div className="movie-details mb-3 pt-4">
                  <p><strong>Release Date:</strong> {movieDetail?.release_date || 'Release date Not Found'}</p>
                  <p><strong>Runtime:</strong> {movieDetail?.runtime ? `${movieDetail.runtime} min` : 'Coming Soon'}</p>
                  <p><strong>IMDb ID:</strong></p>
                  <p>
                     <a href={imdbURL} target="_blank" rel="noopener noreferrer">Visit IMDB</a>
                  </p>
                </div>
                <div className="official-links mt-3">
                  <p><strong>TMDB Rating:</strong></p>
                  <p>
                    {tmdbRating}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-9 d-flex flex-column justify-content-start">
              <div className="words">
                <h1 className="movie-title pl-0" style={{ height: '6rem' }}>
                  {movieDetail?.original_title || 'Movie Not Found'}</h1>
                <h3 className="display-4 text-primary" style={{ height: '4rem' }}>
                  <em>{movieDetail?.tagline || ''}</em></h3>
                <div className="overview mb-4" style={{ maxHeight: '9rem', overflowY: 'auto', height: '9rem' }}>
                  <p className="lead">{movieDetail?.overview || ''}</p>
                </div>
                <div className="featuring-section">
                  <div className="featuring-header my-4">
                      <h3 className="display-4 text-primary">Featuring...</h3>
                  </div>
                  <div className="row justify-content-start" 
                  style={{    
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '1rem'}}>
                      {castDetail.map((person) => (
                          <div key={person.id} className="col-md-2 col-sm-4 mb-4 d-flex flex-column align-items-center">
                              {/* Profile Picture */}
                              {person.profile_path ? (
                                  <img
                                      src={`https://image.tmdb.org/t/p/w1280${person.profile_path}`}
                                      alt={`Profile for ${person.name}`}
                                      className="img-fluid shadow-lg rounded-circle profile-img"
                                      style={{
                                          width: '6rem',  // Set the width to 10rem
                                          height: '5rem', // Set the height to 10rem
                                          objectFit: 'cover', // Ensures the image retains its aspect ratio
                                      }}
                                  />
                              ) : (
                                  <img
                                      src="https://via.placeholder.com/150x150?text=No+Image"
                                      alt="Placeholder"
                                      className="img-fluid shadow-lg rounded-circle profile-img"
                                      style={{
                                          width: '6rem',
                                          height: '5rem',
                                          objectFit: 'cover',
                                      }}
                                  />
                              )}
                              {/* Person's Name */}
                              <div className="mt-2 text-center feature-font-weight-bold" style={{ marginLeft: '-0.5rem', fontWeight: 'bold' }}>{person.name}</div>
                          </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bottom row d-none d-lg-flex">
          <div className="trailer col-md-10 pl-2">
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {trailer.length > 0 ? (
                trailer.map((video) => (
                  <div
                  key={video.id}
                  style={{
                      position: 'relative',
                      width: '48%',
                      //height: '0',
                      paddingBottom: '27%',
                      margin: '1%',
                  }}>
                    <iframe
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 2,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={`Trailer for ${video.key}`}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                </div>
                ))
              ) : (
                <div style={{
                  padding: '2rem',
                  backgroundColor: '#f8d7da',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  color: '#721c24',
                  textAlign: 'center',
                  maxWidth: '500px',
                  margin: '2rem auto',
                  fontFamily: "'Roboto', sans-serif",
                }}>
                  <i className="fas fa-video-slash" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#721c24' }}></i>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '500' }}>Oops! No Trailer Found</h4>
                  <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                    Sorry, we couldn't find a trailer for this movie in TMDB database!!!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="genre-list col-md-2 d-flex flex-column mb-3 pt-3">
            <p className="text-end" style={{marginRight:"2rem"}}><strong>Genre Tags: </strong></p>
            {movieDetail?.genres?.length > 0 ? (
              movieDetail.genres.map((genre) => (
                <div key={genre.id}>
                  <p className="text-end" style={{marginRight:"2rem"}}><strong>{genre.name}</strong></p>
                </div>
            ))
            ) : (
              <p className="text-end" style={{marginRight:"2rem"}}><strong>No genres tags found</strong></p>
            )}
          </div>
        </div>




        <div className="d-block d-lg-none">
          <div style={{ 
            backgroundImage: `url(${backDropUrl})`, 
            height: '35rem',
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                filter: 'blur(8px)', // Apply blur effect to the background
                zIndex: 1, // Keeps the overlay on top of the image
              }}>
            </div>
            <div className="d-flex flex-column align-items-center" style={{
                position: 'relative',
                zIndex: 2, // Content is above the overlay
                width: "100%",
                height: "80%",
                paddingTop: "2rem",
                textAlign: 'center', 
                color: '#fff',
            }}>
              <img
                src={posterUrl}
                alt={`Poster for ${movieDetail.original_title}`}
                style={{
                  width: '80%', // Adjusted for better fitting
                  maxWidth: '200px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 12px rgba(255, 255, 255, 0.5)',
                  marginBottom: '1rem',
                }}
              />
              <div>
                <h1 style={{ 
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                }}>
                  {movieDetail?.original_title || 'Movie Not Found'}
                </h1>
                <h3 style={{
                  marginTop: "0.5rem",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontWeight: "400",
                  color: "#007bff",
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                  fontStyle: "italic"
                }}>
                  <em>{movieDetail?.tagline || ''}</em>
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5 text-center" style={{
            backgroundColor: '#007bff', 
            color: '#fff',
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '400' }}>
              {movieDetail?.overview || ''}
            </p>
          </div>

          <div className="text-center" style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem 0',
          }}>
            <p><strong>Release Date</strong></p> 
            <p>{movieDetail?.release_date || 'Release date Not Found'}</p>
            <p><strong>Runtime</strong></p>
            <p><strong>Runtime:</strong> {movieDetail?.runtime ? `${movieDetail.runtime} min` : 'Coming Soon'}</p>
            <p><strong>IMDb ID:</strong></p>
            <p>
              <a href={imdbURL} target="_blank" rel="noopener noreferrer" style={{
                textDecoration: 'none',
                color: '#007bff',
                fontWeight: '600',
              }}>
                Visit IMDB
              </a>
            </p>
            <p><strong>TMDB Rating:</strong></p>
            <p>
              {tmdbRating}
            </p>
          </div>

          <div className="featuring-section pt-5 pb-5" style={{ 
            backgroundColor: '#007bff', 
            color: '#fff', 
            borderRadius: '10px' 
          }}>
            <div className="row justify-content-center" style={{ gap: '1rem' }}>
              {castDetail.map((person) => (
                <div key={person.id} className="col-3" style={{ textAlign: 'center' }}>
                  {/* Profile Picture */}
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${person.profile_path}`}
                      alt={`Profile for ${person.name}`}
                      style={{
                        width: '5rem',  
                        height: '5rem', 
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150x150?text=No+Image"
                      alt="Placeholder"
                      style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    />
                  )}
                  {/* Person's Name */}
                  <div style={{ marginLeft: '0.5rem', marginTop: '1rem', fontWeight: 'bold' }}>
                    {person.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="justify-content-center align-items-center" style={{ textAlign: 'center' }}>
            {trailer.length > 0 ? (
              trailer.map((video) => (
                <div key={video.id} style={{
                  position: 'relative',
                  width: '95%', 
                  maxWidth: '600px',
                  height: '0',
                  paddingBottom: '56.25%',
                  margin: '1rem auto',
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
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={`Trailer for ${video.key}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))
            ) : (
              <div style={{
                padding: '2rem',
                backgroundColor: '#f8d7da',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                color: '#721c24',
                textAlign: 'center',
                maxWidth: '500px',
                margin: '2rem auto',
                fontFamily: "'Roboto', sans-serif",
              }}>
                <i className="fas fa-video-slash" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#721c24' }}></i>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500' }}>Oops! No Trailer Found</h4>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                  Sorry, we couldn't find a trailer for this movie in TMDB database!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default MovieDetails;
