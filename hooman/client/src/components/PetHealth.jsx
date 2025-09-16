import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";

const PetHealth = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petConditions) {
          setSelectedConditions(res.data.data.petConditions);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleConditionSelect = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/pet-health",
        { petConditions: selectedConditions },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Health conditions saved successfully");
      return true; // Success
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save health conditions");
      return false; // Failure
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-activity");
  };

  const handleNext = async () => {
    if (selectedConditions.length === 0) {
      setMessage("Please select at least one condition");
      return;
    }
    const saved = await handleSave();
    if (saved) {
      navigate("/profile/pet-priorities");
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
        <h1 className="text-4xl font-extrabold mb-2">Any known health conditions?</h1>
        <p className="text-gray-600 mb-6">
          Share any allergies or conditions to help us deliver safe, personalised care tips.
        </p>

        {/* Health Conditions Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Allergies", "Mobility", "Diabetes", "Other", "Joint Issues", "Skin Conditions", "Digestive/Gastrointestinal Concerns"].map((condition, index) => (
            <Button
              key={index}
              variant={selectedConditions.includes(condition) ? "default" : "outline"}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                selectedConditions.includes(condition) ? 'bg-orange-500 text-white' : ''
              } hover:bg-gray-300 transition-colors`}
              onClick={() => handleConditionSelect(condition)}
            >
              {condition}
            </Button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={selectedConditions.length === 0} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetHealth;