import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group 10703.png";
import googleIcon from "../assets/Social button (1).png";
import facebookIcon from "../assets/Social button (2).png";
import theme from "../theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.data.message === "Login successful") {
        navigate("/profile");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = "http://localhost:5000/api/auth/google";
    } catch {
      setMessage("Google login failed");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = "http://localhost:5000/api/auth/facebook";
    } catch {
      setMessage("Facebook login failed");
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
          <button type="submit" className={theme.layout.button} >
            Login
          </button>
        </form>

        

        <div className="mt-4 text-left">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot Password
          </a>
        </div>

        {/* Social Buttons */}
        <div className="mt-6 flex space-x-4">
          <img
            src={googleIcon}
            alt="Google"
            className="w-10 h-10 cursor-pointer hover:opacity-80"
            onClick={handleGoogleLogin}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGoogleLogin();
              }
            }}
            role="button"
            tabIndex={0}
          />
          <img
            src={facebookIcon}
            alt="Facebook"
            className="w-10 h-10 cursor-pointer hover:opacity-80"
            onClick={handleFacebookLogin}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleFacebookLogin();
              }
            }}
            role="button"
            tabIndex={0}
          />
        </div>

        {/* Sign Up Redirect */}
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

        
