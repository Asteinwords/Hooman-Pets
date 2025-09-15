import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";

const PetPriorities = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petPriorities) {
          setSelectedPriorities(res.data.data.petPriorities);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handlePrioritySelect = (priority) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-priorities",
        { petPriorities: selectedPriorities },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Priorities saved successfully");
      return true;
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save priorities");
      return false;
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-health");
  };

  const handleNext = async () => {
    if (selectedPriorities.length === 0) {
      setMessage("Please select at least one priority");
      return;
    }
    const saved = await handleSave();
    if (saved) {
      navigate("/profile/pet-routines");
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
        <p className="text-sm text-gray-600 mb-2">Lifestyle & Preferences</p>
        <h1 className="text-4xl font-extrabold mb-2">What are your top priorities?</h1>
        <p className="text-gray-600 mb-6">
          Pick the topics you care about—daily tips, exercise ideas, nutritional advice, grooming routines, and more.
        </p>

        {/* Priority Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"].map((priority, index) => (
            <Button
              key={index}
              variant={selectedPriorities.includes(priority) ? "default" : "outline"}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                selectedPriorities.includes(priority) ? 'bg-orange-500 text-white' : ''
              } hover:bg-gray-300 transition-colors`}
              onClick={() => handlePrioritySelect(priority)}
            >
              {priority}
            </Button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={selectedPriorities.length === 0} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetPriorities;