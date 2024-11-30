import Hero from './HeroSection.jsx';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Carousel from './Carousel.jsx';
import GenreMovieCard from './GenreMovieCard.jsx';
import { genres } from './assets/genres.jsx';
const accessKey = import.meta.env.VITE_Access_Key;

//loading page
//paganation
//carousel fix
//Footer fix
//caching
//Need to Itiate for each genres/production companies
//what if movie is not yet released
//404 page
//Sometimes a search result doesn't have an image
//there is no handler if there are no search results
//Fix hero section
//Make it pretty
//actor/actress cards
//fix backdrop
//checkout TMDB and IMDB and try to copy them

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
            <Hero text = "Home page hero section" />
            <div id="services" className="container py-5 bg-primary">
                <h1 className="d-flex justify-content-center pb-5">Now Playing</h1>
                <div>
                    {NowPlaying.length > 0 ? (

                        <Carousel chunkedMovies={chunkedMovies} />
                    ) : (
                        <p>Loading Movies In Theaters...</p>
                    )}
                </div>
                <h1 className="d-flex justify-content-center pb-5">Trending Trailers for today</h1>
                <div>
                    {Trailer.length > 0 ? (
                            <Carousel Trailer={chunkedTrailer} />
                    ) : (
                        <p>Loading Today's Trending Movies...</p>
                    )}
                </div>
                <h1 className="d-flex justify-content-center pb-5">What to watch today?? : {genreOfTheDay.name}</h1>
                <div>
                    {TopRated.length > 0 ? (
                        <GenreMovieCard TopRated={TopRated}/>
                    ) : (
                        <p>Loading Today's Movies...</p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
  