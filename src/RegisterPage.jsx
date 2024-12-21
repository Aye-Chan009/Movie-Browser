import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState({ name: false, email: false, password: false, confirmPassword: false });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (name && email && password) {
      navigate("/"); // Redirect to the dashboard or another page
    } else {
      setError("Please fill out all fields.");
    }
  };

  const handleFocus = (field) => {
    setFocus({ ...focus, [field]: true });
  };

  const handleBlur = (field) => {
    setFocus({ ...focus, [field]: false });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div style={styles.registerContainer}>
      <div style={styles.registerCard}>
        <h2 style={styles.cardTitle}>Create Account</h2>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>User Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              required
              style={{
                ...styles.input,
                ...(focus.name && styles.inputFocus),
              }}
            />
          </div>

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
                ...(focus.email && styles.inputFocus),
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
                style={{
                  ...styles.input,
                  ...(focus.password && styles.inputFocus),
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={styles.passwordToggle}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                required
                style={{
                  ...styles.input,
                  ...(focus.confirmPassword && styles.inputFocus),
                }}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                style={styles.passwordToggle}
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Register</button>
        </form>

        <div style={styles.textCenter}>
          <small>
            Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
    marginTop: '3rem',
    backgroundColor: '#f8f9fa',
  },
  registerCard: {
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
    position: 'relative',
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

export default RegisterPage;
