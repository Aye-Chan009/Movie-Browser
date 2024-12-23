import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error state on submit

    // Check if email is valid
    if (email) {
      // Simulate password reset request (in real app, you'd send the request to your backend)
      setTimeout(() => {
        // Simulate success response
        setSuccess(true);
        // Optionally, redirect to login page or show a message
      }, 1500);
    } else {
      setError('Please enter a valid email address.');
    }
  };

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
          className="bg-white"
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
              color: '#007bff', // Primary color for the title
            }}
          >
            Reset Password
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

          {success && (
            <div 
              style={{
                marginBottom: '20px',
                fontSize: '14px',
                color: 'green',
                textAlign: 'center',
              }}
            >
              Check your inbox for a password reset link.
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <div 
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <label 
                  htmlFor="email" 
                  style={{
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#333',
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
                  required
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    width: '100%',
                  }}
                />
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
                Send Reset Link
              </button>
            </form>
          )}

          <div 
            style={{
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <small>
              Remembered your password?{" "}
              <Link 
                to="/login" 
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                }}
              >
                Login here
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
