import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
  });
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false); // New state for confirm password
  const navigate = useNavigate();

  // Validate password
  const validatePassword = (password) => {
    const minLengthValid = password.length >= 6;
    const containsNumberValid = /\d/.test(password);

    setPasswordValid({
      length: minLengthValid,
      number: containsNumberValid,
    });

    return minLengthValid && containsNumberValid;
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPassword) => {
    const isMatch = confirmPassword === password;
    setConfirmPasswordValid(isMatch);
    return isMatch;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (name && email && password) {
        ///
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
    <div className="container p-0 bg-light">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
          padding: "3rem 1rem",
        }}
      >
        <div
          className="bg-white"
          style={{
            padding: "3rem 2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#007bff", // Primary color for the title
            }}
          >
            Create Account
          </h2>

          {error && (
            <div
              style={{
                marginBottom: "20px",
                fontSize: "14px",
                color: "red",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="name"
                style={{
                  fontWeight: "500",
                  marginBottom: "1rem",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                User Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                required
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  ...(focus.name && {
                    border: "1px solid #007bff",
                    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
                  }),
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="email"
                style={{
                  fontWeight: "500",
                  marginBottom: "1rem",
                  color: "#333",
                  textAlign: "left",
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
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                required
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  ...(focus.email && {
                    border: "1px solid #007bff",
                    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
                  }),
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontWeight: "500",
                  marginBottom: "1rem",
                  textAlign: "left",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    width: "100%",
                    ...(focus.password && {
                      border: "1px solid #007bff",
                      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
                    }),
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <span
                    style={{
                      color: passwordValid.length ? "green" : "red",
                    }}
                  >
                    {passwordValid.length ? "✔️" : "❌"} Password minimum length 6 characters
                  </span>
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <span
                    style={{
                      color: passwordValid.number ? "green" : "red",
                    }}
                  >
                    {passwordValid.number ? "✔️" : "❌"} Contains at least 1 number
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="confirmPassword"
                style={{
                  fontWeight: "500",
                  marginBottom: "1rem",
                  textAlign: "left",
                }}
              >
                Confirm Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  required
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    width: "100%",
                    ...(focus.confirmPassword && {
                      border: "1px solid #007bff",
                      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
                    }),
                  }}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <span
                    style={{
                      color: confirmPasswordValid ? "green" : "red",
                    }}
                  >
                    {confirmPasswordValid ? "✔️" : "❌"} Password must be the same
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                fontSize: "16px",
                padding: "12px",
                fontWeight: "bold",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                width: "100%",
              }}
              disabled={
                !passwordValid.length ||
                !passwordValid.number ||
                password !== confirmPassword
              }
            >
              Register
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <small>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
                Log in
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
