import { useState, useEffect } from 'react';
import Hero from './HeroSection';
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
const accessKey = import.meta.env.VITE_Access_Key;

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieDetail, setMovieDetail] = useState(null);
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
    const officialWebsite = movieDetail.homepage ? `${movieDetail.homepage}` : 'No Official Website Found!!';
    
    return (
      <div className="container p-0">
        <div className="top" style={{ backgroundImage: `url(${backDropUrl})` }}>
          <div className="moviedetail-overlay"></div> {/* Dark overlay for the background */}
          <div className="row w-100">
            <div className="col-md-3 d-flex justify-content-start">
              <div className="moviedetail-poster">
                <img
                  src={posterUrl}
                  alt={`Poster for ${movieDetail.original_title}`}
                  className="img-fluid shadow-lg rounded"
                />
                <div className="movie-details mb-3 pt-5">
                  <p><strong>Release Date:</strong> {movieDetail?.release_date || 'Release date Not Found'}</p>
                  <p><strong>Runtime:</strong> {`${movieDetail?.runtime || '...'} min`}</p>
                  <p><strong>IMDb ID:</strong></p>
                  <p>
                     <a href={imdbURL} target="_blank" rel="noopener noreferrer">Visit IMDB</a>
                  </p>
                </div>
                <div className="official-links mt-3">
                  <p><strong>Official Website:</strong></p>
                  <p>
                    <a href={officialWebsite} target="_blank" rel="noopener noreferrer">Visit Official Website</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-9 d-flex flex-column justify-content-start">
              <div className="words">
                <h1 className="movie-title pl-0">{movieDetail?.original_title || 'Movie Not Found'}</h1>
                <h3 className="display-4 text-primary"><em>{movieDetail?.tagline || ''}</em></h3>
                <div className="overview mb-4">
                  <p className="lead">{movieDetail?.overview || 'Overview Not Found'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>


       /* <div>
            <Hero text={movieDetail?.original_title || 'Movie Not Found'} backdrop={backDropUrl} />

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card shadow-sm p-4 mb-4 rounded">
                            <h1 className="display-4 text-primary"><em>{movieDetail?.tagline || ''}</em></h1>

                            <div className="overview mb-4">
                                <p className="lead">{movieDetail?.overview || 'Overview Not Found'}</p>
                            </div>

                            <div className="movie-details mb-3">
                                <p><strong>Release Date:</strong> {movieDetail?.release_date || 'Release date Not Found'}</p>
                                <p><strong>Runtime:</strong> {`${movieDetail?.runtime || '...'} min`}</p>
                                <p><strong>IMDb ID:</strong> <a href={imdbURL} target="_blank" rel="noopener noreferrer">Visit IMDB</a></p>
                            </div>

                            <div className="official-links mt-3">
                                <p><strong>Official Website:</strong> <a href={officialWebsite} target="_blank" rel="noopener noreferrer">Visit Official Website</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 text-center">
                        <img
                            src={posterUrl}
                            alt={`Poster for ${movieDetail.original_title}`}
                            className="movie-poster img-fluid shadow rounded mb-4"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>*/
    );
};

export default MovieDetails;
