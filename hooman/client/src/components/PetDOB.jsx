import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const PetDOB = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog"); // Default to dog if not set
        if (res.data.data.petDOB) {
          setDob(res.data.data.petDOB);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleSave = async () => {
    if (!dob) {
      setMessage("Please enter a date of birth");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-dob",
        { petDOB: dob },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Date of birth saved successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save date of birth");
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-gender"); // Previous step
  };

  const handleNext = () => {
    if (dob) {
      navigate("/profile/pet-weight"); // Next step
    } else {
      setMessage("Please enter a date of birth");
    }
  };

  const capitalizedPet = petType.charAt(0).toUpperCase() + petType.slice(1);

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "100%" }}></div>

        {/* Header */}
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What is the DOB of your {capitalizedPet}?</h1>
        <p className="text-gray-600 mb-6">
          Knowing your pet's birth date helps us provide age-appropriate care advice.
        </p>

        {/* DOB Input */}
        <input
          type="date"
          value={dob}
          onChange={handleDobChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={!dob} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetDOB;