import { Link } from 'react-router-dom';

const SearchBarMovieCards =({movie}) => {

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const movieURL = `/movie/${movie.id}`;

    return (
        <Link to={movieURL} style={{ textDecoration: 'none' }}>
            <div className="card mb-3" style={{maxWidth: '540px', cursor: 'pointer'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={posterUrl} className="img-fluid rounded-start" alt={movie.original_title || 'No Title'}/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{movie.original_title || 'No Title Available'}</h5>
                    </div>
                    </div>
                </div>
            </div>  
        </Link> 
    )
}

export default SearchBarMovieCards;