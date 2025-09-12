import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const DashboardSetup = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const totalFields = 12; // e.g., petType, petName, petBreed, etc.
        const filledFields = Object.values(res.data.data).filter(v => v !== null && v !== "" && (!Array.isArray(v) || v.length > 0)).length;
        setProgress(Math.min(Math.round((filledFields / totalFields) * 100), 100)); // Cap at 100%
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleNext = () => {
    navigate("/dashboard");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <div className="h-1 bg-gray-300 mb-6 rounded-full">
          <div className="h-1 bg-orange-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mb-2">Lifestyle & Preferences</p>
        <h1 className="text-4xl font-extrabold mb-2">Setting up your personalised dashboard</h1>
        <p className="text-gray-600 mb-6">
          It's almost ready
        </p>
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f97316"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 45 * (progress / 100)} ${2 * Math.PI * 45}`}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-xl font-bold text-gray-800">
              {progress}%
            </text>
          </svg>
        </div>
        <NavigationButtons onBack={null} onNext={handleNext} nextDisabled={false} />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default DashboardSetup;