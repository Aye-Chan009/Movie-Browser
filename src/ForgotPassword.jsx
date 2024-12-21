import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
    <div style={styles.forgotPasswordContainer}>
      <div style={styles.forgotPasswordCard}>
        <h2 style={styles.cardTitle}>Reset Password</h2>

        {error && <div style={styles.alert}>{error}</div>}
        {success && <div style={styles.successMessage}>Check your inbox for a password reset link.</div>}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.submitButton}>Send Reset Link</button>
          </form>
        )}

        <div style={styles.textCenter}>
          <small>
            Remembered your password? <a href="/login" style={styles.link}>Login here</a>
          </small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  forgotPasswordContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
    marginTop: '3rem',
    backgroundColor: '#f8f9fa',
  },
  forgotPasswordCard: {
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
    marginBottom: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '100%',
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
  successMessage: {
    marginBottom: '20px',
    fontSize: '14px',
    color: 'green',
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
};

export default ForgotPasswordPage;
