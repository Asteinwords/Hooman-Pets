import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const PetExperience = () => {
  const [selectedExperience, setSelectedExperience] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.data.data.petExperience) {
          setSelectedExperience(res.data.data.petExperience);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleExperienceSelect = async (experience) => {
    setSelectedExperience(experience);
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-experience",
        { petExperience: experience }, // FIXED: Changed from { experience } to { petExperience: experience }
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (err) {
      console.error("Save error:", err.response?.data); // Debug log
      setMessage(err.response?.data?.message || "Failed to save experience");
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleNext = () => {
    if (selectedExperience) {
      navigate("/profile/pet-basics");
    } else {
      setMessage("Please select an experience level");
    }
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "60%" }}></div>
        <p className="text-sm text-gray-600 mb-2">User Profile</p>
        <h1 className="text-4xl font-extrabold mb-2">Have you owned a pet before?</h1>
        <p className="text-gray-600 mb-6">
          We'll adjust tips and guidance based on your experience level.
        </p>
        <div className="flex space-x-4 mb-6">
          <button
            className={`${theme.layout.button} bg-gray-300 text-black ${selectedExperience === 'experienced' ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => handleExperienceSelect('experienced')}
          >
            Yes-Experienced
          </button>
          <button
            className={`${theme.layout.button} bg-gray-300 text-black ${selectedExperience === 'firstTime' ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => handleExperienceSelect('firstTime')}
          >
            No-First Time
          </button>
        </div>
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={!selectedExperience}
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetExperience;