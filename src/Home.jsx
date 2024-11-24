import Hero from './HeroSection';
import React, { useState, useEffect } from 'react';
import MovieCarousel from './Carousel.jsx'
const accessKey = import.meta.env.VITE_Access_Key;

//VITE_Access_Key = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3ZmQ0OTZkYzAzYTExY2U1Y2FkYWM4ZTU1YmZmMCIsIm5iZiI6MTczMjQ2Njk4My44MDYwMzY1LCJzdWIiOiI2NzM4ZWNmYTljMTZkYWZhMDZmOWFlZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.A-wot8wd9tGMNkp3HZdNg3AwzQPN3sctyand4CiDJsc


const Home = () => {
    const [popularMovie, setPopularMovie] = useState(null)

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
                setPopularMovie(data.results);
                } else {
                setPopularMovie([]);
                }
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div>
            <Hero text = "Home page hero section" />
            <div id="services" className="container py-5 bg-primary">
                <h1 className="d-flex justify-content-center pb-5">Our Home</h1>
                <div>
                    {popularMovie ? (

                        <MovieCarousel popularMovie={popularMovie} />
                    ) : (
                        <p>Loading popular movies...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
  