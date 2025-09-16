import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import leftImage from "../assets/b5f06505ae6ca63137612deedda19cc3f8714b7d.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  const location = useLocation();

  // Check for error from Google auth
  useEffect(() => {
    const error = location.search.includes('error');
    if (error) {
      setMessage("Google authentication failed. Please try again.");
      setIsLoading(false);
    }
  }, [location]);

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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      console.log("Registration response:", res.data);
      setMessage(res.data.message || "Registration successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        profilePicture: res.data.profilePicture,
      }));

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/profile/pet-experience");
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

  const handleGoogleRegister = () => {
    setIsLoading(true);
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex">
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

      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-12 py-16">
        <div className="mb-6 text-xl font-semibold">Welcome to Hooman</div>

        <div className="flex bg-gray-900 rounded-full w-48 mb-8">
          <Button
            variant="ghost"
            className="flex-1 text-gray-500 py-2 font-semibold hover:text-white"
            onClick={() => navigate("/login")}
            disabled={isLoading}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-[#E95744] rounded-full py-2 text-white font-semibold"
            disabled={isLoading}
          >
            Register
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-orange-500 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9a8.96 8.96 0 012.175-5.625M15 15l6 6M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.07 0-2.09-.21-3.03-.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-orange-500 focus:outline-none"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9a8.96 8.96 0 012.175-5.625M15 15l6 6M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.07 0-2.09-.21-3.03-.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-orange-500"
                disabled={isLoading}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !name || !email || !password || password !== confirmPassword}
            className="w-full bg-[#E95744] hover:bg-orange-600 transition duration-200 text-white py-3 rounded-full font-semibold disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${message.includes('failed') || message.includes('match') || message.includes('required') ? 'bg-red-900/50 border border-red-500 text-red-300' : 'bg-green-900/50 border border-green-500 text-green-300'}`}>
            {message}
          </div>
        )}

        <div className="flex items-center my-8 text-gray-500 text-sm">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="mx-4">Or register with</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center space-x-2 border border-gray-800 rounded-md py-3 hover:border-orange-500 transition duration-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                fill="#EA4335"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#4285F4"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#34A853"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2 border border-gray-800 rounded-md py-3 hover:border-orange-500 transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
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
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-500 hover:underline font-semibold"
            disabled={isLoading}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;