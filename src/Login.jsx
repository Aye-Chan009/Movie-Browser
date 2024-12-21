import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <h2 style={styles.cardTitle}>Login</h2>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
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
                ...styles.input,
                ...(focus.email && styles.inputFocus) // Apply focus style when input is focused
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
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
                  ...styles.input,
                  ...(focus.password && styles.inputFocus) // Apply focus style when input is focused
                }}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                style={styles.passwordToggle}
              >
                {passwordVisible ? "Hide" : "Show"} {/* Toggle text */}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Log In</button>
        </form>

        <div style={styles.textCenter}>
          <small>
            Don't have an account? <a href="/Register" style={styles.link}>Sign up</a>
          </small>
        </div>

        <div style={styles.textCenter}>
          <small>
            <Link to="/PasswordReset" style={styles.link}>Forgot Password?</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
    marginTop: '3rem',
    backgroundColor: '#f8f9fa',
  },
  loginCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '100%',
  },
  inputFocus: {
    borderColor: '#007bff',
    boxShadow: '0 0 0 0.2rem rgba(38, 143, 255, 0.25)',
  },
  submitButton: {
    fontSize: '16px',
    padding: '12px',
    fontWeight: 'bold',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    width: '100%',
  },
  alert: {
    marginBottom: '20px',
    fontSize: '14px',
    color: 'red',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  passwordContainer: {
    position: 'relative', // To position the toggle button
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default LoginPage;
