import React from 'react';
import Hero from './HeroSection';
import { Link } from 'react-router-dom';

const MovieNotFound = () => {
    return (
        <div className="container p-0">
            <Hero text={"Page does not exist"} />
            {/* Inline styles for the 404 page with bg-primary and bg-dark */}
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh', // Adjust the height for your design
                    backgroundColor: '#007bff', // bg-primary equivalent
                    textAlign: 'center',
                    padding: '3rem 1rem',
                }}
            >
                <div 
                    className="bg-dark text-white"
                    style={{
                        padding: '3rem 2rem',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        width: '100%',
                    }}
                >
                    <h1 
                        style={{
                            fontSize: '6rem',
                            fontWeight: '700',
                            color: '#f9a825', // Light color for contrast
                        }}
                    >
                        404
                    </h1>
                    <h2 
                        style={{
                            fontSize: '1.5rem',
                            marginTop: '1rem',
                            color: '#f8f9fa', // Light color for contrast
                        }}
                    >
                        Oops! The page you're looking for doesn't exist.
                    </h2>
                    <p 
                        style={{
                            fontSize: '1rem',
                            color: '#f8f9fa', // Light color for contrast
                            margin: '1rem 0',
                        }}
                    >
                        It seems like you've hit a dead end. Let's take you back to safety.
                    </p>
                    <Link
                        to="/"
                        className="btn btn-light" 
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginTop: '1.5rem',
                        }}
                    >
                        Go Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieNotFound;
