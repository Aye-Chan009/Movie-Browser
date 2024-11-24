const SearchBarMovieCards =({movie}) => {

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    //const movieURL = `/movie/${movie.id}`;

    return (
        //<Link to={movieURL} style={{ textDecoration: 'none' }}>
            <div className="card mb-3 w-100" 
            style={{cursor: 'pointer', margin: '0', padding: '0'}}>
                <div className="row g-0">
                    <div className="col-md-2 col-2 col-sm-2">
                        <img src={posterUrl} className="img-fluid rounded-start" alt={movie.original_title || 'No Title'}/>
                    </div>
                    <div className="col-md-10 col-10 col-sm-10">
                        <div className="card-body" style={{
                            width: '100%',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            paddingLeft: '2%'}}>
                            <h5 className="card-title fs-6">{movie.original_title || 'No Title Available'}</h5>
                        </div>
                    </div>
                </div>
            </div>  
        //</Link> 
    )
}

export default SearchBarMovieCards;