import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const PetName = () => {
  const navigate = useNavigate();
  const [petName, setPetName] = useState("");

  const handleBack = () => {
    navigate("/profile/pet-basics");
  };

  const handleNext = () => {
    // Here you can add logic to save the pet name if needed
    navigate("/dashboard");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "100%" }}></div>

        {/* User Profile Text */}
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What is your [pet]’s name?</h1>
        <p className="text-gray-600 mb-6">
          Let’s give your pet a voice, knowing their name helps us personalise every interaction.
        </p>

        {/* Pet Name Input */}
        <input
          type="text"
          placeholder="Ex. Coco"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-200 placeholder-gray-500"
        />

        {/* Navigation Buttons */}
        <div className="mt-6">
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={!petName.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default PetName;
