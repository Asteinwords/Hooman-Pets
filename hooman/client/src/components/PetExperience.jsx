import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const PetExperience = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/profile");
  };

  const handleNext = () => {
    navigate("/profile/pet-basics");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "60%" }}></div>

        {/* User Profile Text */}
        <p className="text-sm text-gray-600 mb-2">User Profile</p>
        <h1 className="text-4xl font-extrabold mb-2">Have you owned a pet before?</h1>
        <p className="text-gray-600 mb-6">
          We'll adjust tips and guidance based on your experience level.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 mb-6">
          <button className={`${theme.layout.button} bg-gray-300 text-black`} onClick={() => alert("Yes-Experienced selected")}>
            Yes-Experienced
          </button>
          <button className={`${theme.layout.button} bg-gray-300 text-black`} onClick={() => alert("No-First Time selected")}>
            No-First Time
          </button>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons onBack={handleBack} onNext={handleNext} nextDisabled={false} />
      </div>
    </div>
  );
};

export default PetExperience;
