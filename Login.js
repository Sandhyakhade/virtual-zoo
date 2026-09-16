
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        console.log("navigation to the dashboard");
        //alert(response);
        console.log(response);
        console.log("email form login response", response.data.user.email);
        localStorage.setItem("token", response.data.token); // Save token
        localStorage.setItem("email", response.data.user.email);
         localStorage.setItem("username", response.data.user.username);
        
        // Save email as string

        // Save email
        // Save user data
        navigate("/UserDashboard", { state: { email: response.data.email } }); // Redirect to Dashboard
        // Redirect to Dashboard
        // Redirect to Dashboard
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };


  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
        <button type="submit">Log In</button>
        
        <div className="forgot-password">
          <Link to="/forgot-password" style={{ color: "#007BFF", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
