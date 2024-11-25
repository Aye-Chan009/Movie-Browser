import { useState, useEffect } from 'react';
import Hero from './HeroSection'
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
const apiKey = import.meta.env.VITE_API_KEY;

const MovieDetails =() => {
    
    const {id} = useParams()
    const navigate = useNavigate();
    const [movieDetail, setMovieDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`


    useEffect(() => {
        setIsLoading(true);
    
        fetch(detailUrl)
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
            <Hero text = "Loading....." />
        </div>)
      }
    
    if (error) {
        return (
            <div>
                <Hero text = {error} />
            </div>)
      }

    const posterUrl = movieDetail.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const backDropUrl = movieDetail.backdrop_path ? `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const imdbURL = movieDetail.imdb_id ? `https://www.imdb.com/title/${movieDetail.imdb_id}` : 'No IMDB Link Found!!';
    const officialWebsite = movieDetail.homepage ? `${movieDetail.homepage}` : 'No Official Website Found!!';

    return (  
        <div>
            <Hero text={movieDetail?.original_title || 'Movie Not Found'}
                backdrop={backDropUrl}
            />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-7">
                        <h1 className="lead fs-1"><em>{movieDetail?.tagline || ''}</em></h1>
                        <div className="overview mb-4">
                            <p>{movieDetail?.overview || 'Overview Not Found'}</p>
                        </div>
                        <div className="mb-3">
                            <p><strong>Release Date: </strong>{movieDetail?.release_date || 'Release date Not Found'}</p>
                            <p><strong>Runtime: </strong>{`${movieDetail?.runtime || '...'} min`}</p>
                            <p><strong>IMDb ID: </strong> <a href={imdbURL} target="_blank">Visit IMDB Website.</a></p>
                        </div>
                        {/*


                        //Need to Itiate for each genres/production companies
                        //what if movie is not yet released
                        //404 page
                        //Sometimes a search result doesn't have an image
                        //there is no handler if there are no search results
                        //Fix hero section
                        //Make it pretty
                        //actor/actress cards
                        //fix backdrop
                        //drop down at search
                        //checkout TMDB and IMDB and try to copy them




                        <div className="genre-container">
                            <h4>Genres:</h4>
                            <span className="badge bg-primary">Crime</span>
                            <span className="badge bg-secondary">Drama</span>
                            <span className="badge bg-warning">Thriller</span>
                            <span className="badge bg-danger">Action</span>
                        </div>

                        <div className="mt-3">
                            <h4>Production Companies:</h4>
                            <ul>
                                <li>Paramount Pictures</li>
                                <li>Skydance Media</li>
                                <li>TC Productions</li>
                            </ul>
                        </div>*/}
                        <div className="mt-3">
                            <p><strong>Official Website:</strong> <a href={officialWebsite} target="_blank">Visit Official Website.</a></p>
                        </div>
                    </div>
                    <div className="col-md-5 text-center">
                        <img src={posterUrl} alt={`Poster for ${movieDetail.original_title}`} className="movie-poster img-fluid shadow rounded h-80 mb-3"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>  
    )
}

export default MovieDetails;