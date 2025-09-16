import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";

const PetGender = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [message, setMessage] = useState("");
  const [petName, setPetName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog"); // Default to dog if not set
        if (res.data.data.petGender) {
          setSelectedGender(res.data.data.petGender);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        setPetName(res.data.data.petName || "pet");
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);


  const handleGenderSelect = async (gender) => {
    setSelectedGender(gender);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/pet-gender",
        { petGender: gender },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Gender saved successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save gender");
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-breed"); // Previous step
  };

  const handleNext = () => {
    if (selectedGender) {
      navigate("/profile/pet-age"); // Next step, adjust as needed
    } else {
      setMessage("Please select a gender");
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
        <div className="h-1 bg-[#E95744] mb-6 rounded-full" style={{ width: "100%" }}></div>

        {/* Header */}
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What is the gender of {petName || capitalizedPet}?</h1>
        <p className="text-gray-600 mb-6">
          Gender-specific insights help us provide tailored care advice for your pet.
        </p>

        {/* Gender Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Male", "Female", "Unknown"].map((gender, index) => (
            <Button
              key={index}
              variant={selectedGender === gender ? "default" : "outline"}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                selectedGender === gender ? 'bg-orange-500 text-white' : ''
              } hover:bg-gray-300 transition-colors`}
              onClick={() => handleGenderSelect(gender)}
            >
              {gender}
            </Button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={!selectedGender} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetGender;