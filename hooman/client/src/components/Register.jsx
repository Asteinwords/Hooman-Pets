import React, { useState } from "react";
import leftImage from "../assets/b5f06505ae6ca63137612deedda19cc3f8714b7d.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending registration request:", { name, email, password: "[hidden]" });
      const res = await axios.post("http://localhost:5000/api/profile/register", {
        name,
        email,
        password,
      });
      console.log("Registration response:", res.data);
      setMessage(res.data.message || "Registration successful");
      localStorage.setItem("token", res.data.token);
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMsg = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image with logo */}
      <div className="hidden md:flex w-1/2 flex-col bg-black relative">
        <img
          src={import.meta.env.BASE_URL + "src/assets/Property 1=WEB LOGO.png"}
          alt="Hooman Logo"
          className="absolute top-6 left-6 w-48 z-10"
        />
        <div
          className="flex-grow bg-cover bg-center"
          style={{ backgroundImage: `url(${leftImage})` }}
        ></div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-12 py-16">
        <div className="mb-6 text-xl font-semibold">Welcome to Hooman</div>

        {/* Register/Login toggle */}
        <div className="flex bg-gray-900 rounded-full w-48 mb-8">
          <button
            className="flex-1 text-gray-500 py-2 font-semibold hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="flex-1 bg-orange-500 rounded-full py-2 text-white font-semibold">
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-orange-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9a8.96 8.96 0 012.175-5.625M15 15l6 6M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.07 0-2.09-.21-3.03-.6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-orange-500 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9a8.96 8.96 0 012.175-5.625M15 15l6 6M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.07 0-2.09-.21-3.03-.6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="form-checkbox h-4 w-4 text-orange-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition duration-200 text-white py-3 rounded-full font-semibold disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-sm text-red-300">
            {message}
          </div>
        )}

        {/* Or login with */}
        <div className="flex items-center my-8 text-gray-500 text-sm">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="mx-4">Or login with</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Social login buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-800 rounded-md py-2 hover:border-orange-500 transition duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                fill="#EA4335"
                d="M12 11.5v3.5h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.1 7.1 14.2 6.5 12 6.5 7.6 6.5 4 10.1 4 14.5s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.7 0-.5 0-.8-.1-1.2H12z"
              />
            </svg>
            <span>Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-800 rounded-md py-2 hover:border-orange-500 transition duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                fill="#000000"
                d="M16.365 1.43c-1.4.1-3.07.95-4.05 2.1-1.1 1.3-1.8 3.3-1.6 5.2 1.7.1 3.5-1.1 4.5-2.3 1-1.2 1.7-2.9 1.2-5zM12 6.5c-2.3 0-4.3 1.9-4.3 4.3 0 2.3 1.9 4.3 4.3 4.3 2.3 0 4.3-1.9 4.3-4.3 0-2.3-1.9-4.3-4.3-4.3z"
              />
              <path
                fill="#000000"
                d="M18.5 12c0 3.3-2.7 6-6 6-3.3 0-6-2.7-6-6 0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6z"
              />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;