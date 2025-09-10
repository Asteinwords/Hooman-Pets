import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group 10703.png";
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
      const res = await axios.post("http://localhost:5000/api/profile/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.data.message === "Registration successful") {
        localStorage.setItem('token', res.data.token);
        navigate("/profile");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <h2 className="text-3xl font-bold text-left mb-6">Sign-Up</h2>
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
        <p className="mt-4 text-sm text-left">
          Already have an account?{" "}
          <a href="/login" className={theme.layout.link}>
            Sign In
          </a>
        </p>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;