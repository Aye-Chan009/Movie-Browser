import { Link } from 'react-router-dom';
import './App.css';
import './GenreMovieCard.css'

const GenreMovieCards = ({ TopRated }) => {

    return (
        <div className="genre-movie-cards">
            {TopRated.map((movie) => {
                const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
                const movieURL = `/movie/${movie.id}`;

                return (
                    <div key={movie.id} className="genre-movie-card">
                        <div className="card card-wrapper-mini" style={{ position: 'relative' }}>
                            <img src={posterUrl} className="card-img-top" alt={movie.original_title || 'No Title'} />
                            <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                                <h5 className="card-title">{movie.original_title || 'No Title Available'}</h5>
                                <Link to={movieURL} className="btn btn-primary">
                                    Show Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GenreMovieCards;
