import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./LoginPage.css";
const AdminLogin = () => {
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
      const response = await axios.post("http://localhost:5000/adminlogin", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const user = response.data.user;

        // Save session data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.username);

        console.log("email from login response:", user.email);
        console.log("username from login response:", user.username);

        // ✅ Check if the user is admin
        if (user.username === "admin" && user.isAdmin) {
          navigate("/Dashboard", {
            state: { email: user.email, username: user.username },
          });
            
        } else {
          setError("Access denied. Not authorized as admin.");
        }
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

export default AdminLogin;
