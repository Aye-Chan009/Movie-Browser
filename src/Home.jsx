import Hero from './HeroSection';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import MovieCarousel from './Carousel.jsx'
const accessKey = import.meta.env.VITE_Access_Key;

const isReleaseDateInPast = (releaseDate) => {
    const today = new Date();
    const releaseDateObj = new Date(releaseDate);
    today.setHours(0, 0, 0, 0);
    releaseDateObj.setHours(0, 0, 0, 0);
    return today > releaseDateObj;
  };

const Home = () => {
    const [NowPlaying, setNowPlaying] = useState([])
    const [Trending, setTrending] = useState([])
    const [Trailer, setTrailer] = useState([])

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
                        return {
                            movieId: movie.id,
                            trailerId: data.results[0].key,
                        };
                    } else {
                        return { movieId: movie.id, trailerId: null };
                    }
                })
                .catch((err) => {
                    console.error(`Error fetching trailer for movie ${movie.id}:`, err);
                    return { movieId: movie.id, trailerId: null };
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
                if (i % 3 === 0) {
                    chunkedMovies.push(NowPlaying.slice(i, i + 3));
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

                        <MovieCarousel chunkedMovies={chunkedMovies} />
                    ) : (
                        <p>Loading Movies In Theaters...</p>
                    )}
                </div>
                <h1 className="d-flex justify-content-center pb-5">Today's Trending Movies</h1>
                <div>
                    {Trailer.length > 0 ? (
                            <MovieCarousel chunkedTrailer={chunkedTrailer} />
                    ) : (
                        <p>Loading Today's Trending Movies...</p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
  