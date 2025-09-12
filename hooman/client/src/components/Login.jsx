import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group 10703.png";
import theme from "../theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/profile/login", {
        email,
        password,
      });
      console.log("Login response:", res.data); // Debug log
      if (res.data.token) { // Check for token existence instead of message
        localStorage.setItem('token', res.data.token);
        console.log("Token saved, navigating to /profile/pet-experience"); // Debug log
        navigate("/profile/pet-experience"); // Redirect to experience page
      } else {
        setMessage("Unexpected response - no token received");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data); // Debug log
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <h2 className="text-3xl font-bold text-left mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={theme.layout.input}
            placeholder="Enter your e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={theme.layout.input}
            placeholder="Enter your password"
          />
          <button type="submit" className={theme.layout.button}>
            Login
          </button>
        </form>
        <div className="mt-4 text-left">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot Password
          </a>
        </div>
        <p className="mt-6 text-sm text-left text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className={theme.layout.link}>
            Sign Up
          </a>
        </p>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;