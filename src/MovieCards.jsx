import './MovieCards.css';
import { Link } from 'react-router-dom';

const MovieCards =({movie}) => {

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const movieURL = `/movie/${movie.id}`;

    return (
        <div className="card-wrapper">
            <div className="card default-card">
                <img src={posterUrl} className="card-img-top" alt={movie.original_title || 'No Title'}/>
                <div className="card-body">
                    <h5 className="card-title">{movie.original_title || 'No Title Available'}</h5>
                    <p className="card-text default-card-text">
                        {movie.overview || 'No overview available.'}
                    </p>
                </div>
            </div>
            <div className="card text-bg-dark hover-card">
                <img src={posterUrl} className="card-img-top hover-card-img" alt={movie.original_title || 'No Title'}/>
                <div className="card-img-overlay">
                    <h5 className="card-title">{movie.original_title || 'No Title Available'}</h5>
                    <p className="card-text hover-card-text">
                        {movie.overview || 'No overview available.'}
                    </p>
                    <Link to={movieURL} className="btn btn-primary">
                        Show Detail
                    </Link>
                </div> 
            </div>
        </div>       
    )
}

export default MovieCards;