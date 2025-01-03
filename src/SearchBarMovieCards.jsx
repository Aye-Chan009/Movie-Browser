import noImage500x750 from './assets/No_Image_500x750.png';

const SearchBarMovieCards =({movie}) => {

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noImage500x750;

    return (
            <div className="card mb-3 col-12" 
            style={{cursor: 'pointer', margin: '0', padding: '0'}}>
                <div className="row g-0">
                    <div className="col-md-2 col-2 col-sm-2 col-lg-2">
                        <img src={posterUrl} className="img-fluid rounded-start" alt={movie.original_title || 'No Title'}/>
                    </div>
                    <div className="col-md-10 col-10 col-sm-10">
                        <div className="card-body" style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            paddingLeft: '2%'}}>
                            <h5 className="card-title" style={{fontSize: '1rem'}}>{movie.original_title || 'No Title Available'}</h5>
                        </div>
                    </div>
                </div>
            </div>  
    )
}

export default SearchBarMovieCards;