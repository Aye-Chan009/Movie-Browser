import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSuccessPage = () => {
    return (
        <div className="container p-0 bg-light">
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh', // Adjust the height for your design
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
                    <h2 
                        style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: '#f9a825', // Success green color
                        }}
                    >
                        Registration Successful!
                    </h2>
                    <p 
                        style={{
                            fontSize: '1rem',
                            color: '#f8f9fa', // Dark text for readability
                            marginBottom: '2rem',
                        }}
                    >
                        Your account has been successfully created. Please check your email to verify your account.
                    </p>
                    
                    <div 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link 
                            to="/" 
                            className="btn btn-primary"
                            style={{
                                fontSize: '1.1rem',
                                padding: '12px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            Go Back to Home
                        </Link>

                        <Link 
                            to="/login" 
                            className="btn btn-secondary"
                            style={{
                                fontSize: '1.1rem',
                                padding: '12px 20px',
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            Go to Login
                        </Link>

                        <button 
                            onClick={() => alert("Verification link has been resent to your email.")}
                            style={{
                                fontSize: '1.1rem',
                                padding: '12px 20px',
                                backgroundColor: '#28a745', // Green color for resend verification
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Resend Verification Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessPage;
