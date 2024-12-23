import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [focus, setFocus] = useState({ email: false, password: false });
    const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            // Assuming authentication logic goes here
            navigate("/"); // Redirect to the dashboard or another page
        } else {
            setError("Please enter both email and password.");
        }
    };

    const handleFocus = (field) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field) => {
        setFocus({ ...focus, [field]: false });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Toggle the password visibility
    };

    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '3rem',
                marginBottom: '3rem',
                height: '70vh', // Adjust the height for your design
                backgroundColor: '#f8f9fa',
            }}
        >
            <div 
                style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <h2 
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    Login
                </h2>

                {error && (
                    <div 
                        style={{
                            marginBottom: '20px',
                            fontSize: '14px',
                            color: 'red',
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div 
                        style={{
                            marginBottom: '20px',
                        }}
                    >
                        <label 
                            htmlFor="email" 
                            style={{
                                fontWeight: '500',
                            }}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            required
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ced4da', // Border shorthand
                                width: '100%',
                                ...(focus.email && {
                                    border: '1px solid #007bff',
                                    boxShadow: '0 0 0 0.2rem rgba(38, 143, 255, 0.25)',
                                }),
                            }}
                        />
                    </div>

                    <div 
                        style={{
                            marginBottom: '20px',
                        }}
                    >
                        <label 
                            htmlFor="password" 
                            style={{
                                fontWeight: '500',
                            }}
                        >
                            Password
                        </label>
                        <div 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <input
                                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                required
                                style={{
                                    padding: '10px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    width: '100%',
                                    ...(focus.password && {
                                        border: '1px solid #007bff',
                                        boxShadow: '0 0 0 0.2rem rgba(38, 143, 255, 0.25)',
                                    }),
                                }}
                            />
                            <div 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '10px',
                                }}
                            >
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility} 
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#007bff',
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle the eye icon */}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            fontSize: '16px',
                            padding: '12px',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            width: '100%',
                        }}
                    >
                        Log In
                    </button>
                </form>

                <div 
                    style={{
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <small>
                        Don't have an account?{" "} 
                        <Link 
                            to="/Register" 
                            style={{
                                color: '#007bff',
                                textDecoration: 'none',
                            }}
                        >
                            Sign up
                        </Link>
                    </small>
                </div>

                <div 
                    style={{
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <small>
                        <Link 
                            to="/PasswordReset" 
                            style={{
                                color: '#007bff',
                                textDecoration: 'none',
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
