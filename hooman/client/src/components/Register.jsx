import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group 10703.png";
import googleIcon from "../assets/Social button (1).png";
import facebookIcon from "../assets/Social button (2).png";
import twitterIcon from "../assets/Social button.png";
import theme from "../theme";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.data.message === "Registration successful") {
        navigate("/login");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = "http://localhost:5000/api/auth/google";
    } catch {
      setMessage("Google registration failed");
    }
  };

  const handleFacebookRegister = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = "http://localhost:5000/api/auth/facebook";
    } catch {
      setMessage("Facebook registration failed");
    }
  };

  const handleTwitterRegister = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = "http://localhost:5000/api/auth/twitter";
    } catch {
      setMessage("Twitter registration failed");
    }
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-left mb-6">Sign-Up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={theme.layout.input}
            placeholder="Enter your Name"
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={theme.layout.input}
            placeholder="Confirm password"
          />
          <button type="submit" className={theme.layout.button}>
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-sm text-left">
          Already have an account?{" "}
          <a href="/login" className={theme.layout.link}>
            Sign In
          </a>
        </p>

        {/* Social Buttons */}
        <div className="mt-6 flex space-x-4">
          <img 
            src={googleIcon} 
            alt="Google" 
            className="w-10 h-10 cursor-pointer hover:opacity-80" 
            onClick={handleGoogleRegister}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGoogleRegister();
              }
            }}
            role="button"
            tabIndex={0}
          />
          <img 
            src={facebookIcon} 
            alt="Facebook" 
            className="w-10 h-10 cursor-pointer hover:opacity-80" 
            onClick={handleFacebookRegister}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleFacebookRegister();
              }
            }}
            role="button"
            tabIndex={0}
          />
          <img 
            src={twitterIcon} 
            alt="Twitter" 
            className="w-10 h-10 cursor-pointer hover:opacity-80" 
            onClick={handleTwitterRegister}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTwitterRegister();
              }
            }}
            role="button"
            tabIndex={0}
          />
        </div>

        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
