import HomeHero from './HomeHeroSection.jsx';
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import GenreMovieCard from './GenreMovieCard.jsx';
import { genres } from './assets/genres.jsx';
const accessKey = import.meta.env.VITE_Access_Key;

//if API return unsuccessful -> error page
//paganation
//homepage herosection call to action button
//Footer fix
//caching
//spinner for loading
//trailer not found at movie detail
//Make it pretty / search button color / background img or color
//static placeholder images

const isReleaseDateInPast = (releaseDate) => {
    const today = new Date();
    const releaseDateObj = new Date(releaseDate);
    today.setHours(0, 0, 0, 0);
    releaseDateObj.setHours(0, 0, 0, 0);
    return today > releaseDateObj;
  };

const getGenreOfTheDay = () => {
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
};

const genreOfTheDay = getGenreOfTheDay();

const Home = () => {
    const [NowPlaying, setNowPlaying] = useState([])
    const [Trending, setTrending] = useState([])
    const [Trailer, setTrailer] = useState([])
    const [TopRated, setTopRated] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessKey}`
            }
        };
        
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                setNowPlaying(data.results);
                } else {
                setNowPlaying([]);
                }
            })
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                setTrending(data.results);
                } else {
                setTrending([]);
                }
            })
            .catch(err => console.error(err));
            
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genreOfTheDay.id}`, options)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                setTopRated(data.results);
                } else {
                setTopRated([]);
                }
            })
            .catch(err => console.error(err));

    }, []);

    useEffect(() => {
        const fetchTrailers = async () => {
            if (Trending.length === 0) {
                return; 
            }
    
            const trailerPromises = Trending.map((movie) => fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${accessKey}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.results.length > 0) {
                        // Find the first trailer with type 'trailer'
                        const trailer = data.results.find((item) => item.type === 'Trailer');
                        if (trailer) {
                            return {
                                movieId: movie.id,
                                trailerKey: trailer.key,
                            };
                        } else {
                            return { movieId: movie.id, trailerKey: null };
                        }
                    } else {
                        return { movieId: movie.id, trailerKey: null };
                    }
                })
                .catch((err) => {
                    console.error(`Error fetching trailer for movie ${movie.id}:`, err);
                    return { movieId: movie.id, trailerKey: null };
                }));
    
            const trailers = await Promise.all(trailerPromises);
            const flattenedTrailers = trailers.flat();
            setTrailer(flattenedTrailers);
        };
    
        fetchTrailers();
    }, [Trending]);

    const chunkedMovies = [];
    if (NowPlaying.length > 0) {
        for (let i = 0; i < NowPlaying.length; i++) {
            const movie = NowPlaying[i];
            if (isReleaseDateInPast(movie.release_date)) {
                if (i % 4 === 0) {
                    chunkedMovies.push(NowPlaying.slice(i, i + 4));
                }
            }
        }
    }

    const chunkedTrailer = [];
    if (Trailer.length > 0) {
        for (let i = 0; i < Trailer.length; i++) {
            if (i % 2 === 0) {
                chunkedTrailer.push(Trailer.slice(i, i + 2));
            }
        }
    }
 
    return (
        <div>
            <HomeHero text = "Home page hero section" />
            <div className='bg-primary'>
            <div id="services" className="container p-0">
                <div className="d-flex justify-content-center fs-1 pt-5 pb-5 px-3 m-0" style={{ fontWeight: 'bold' }}>Now Playing</div>
                <div>
                    {NowPlaying.length > 0 ? (

                        <Carousel chunkedMovies={chunkedMovies} />
                    ) : (
                        <p>Loading Movies In Theaters...</p>
                    )}
                </div>
            </div>
            </div>
            <div className='bg-secondary'>
            <div id="services" className="container p-0">
                    <div className="d-flex justify-content-center fs-1 pt-5 pb-5 px-3 m-0 text-white" style={{ fontWeight: 'bold' }}>Trending Trailers for today</div>
                    <div>
                        {Trailer.length > 0 ? (
                                <Carousel Trailer={chunkedTrailer} />
                        ) : (
                            <p>Loading Today's Trending Movies...</p>
                        )}
                    </div>
            </div>
            </div>
            <div className='bg-light'>
            <div id="services" className="container p-0">
                <div className="d-flex justify-content-center fs-1 pt-5 pb-5 px-3 m-0" style={{ fontWeight: 'bold' }}>What to watch today?? : {genreOfTheDay.name}</div>
                <div>
                    {TopRated.length > 0 ? (
                        <GenreMovieCard TopRated={TopRated}/>
                    ) : (
                        <p>Loading Today's Movies...</p>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Home;
  