import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import { FaCat, FaDog } from "react-icons/fa";
import NavigationButtons from "./NavigationButtons";

const PetBasics = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState("");
  const otherPets = ['Bird', 'Fish', 'Rabbit', 'Hamster'];

  const handleBack = () => {
    navigate("/profile/pet-experience");
  };

  const handleNext = () => {
    // Here you can add logic to save the selected pet type if needed
    navigate("/profile/pet-name");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "90%" }}></div>

        {/* User Profile Text */}
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What kind of pet do you have?</h1>
        <p className="text-gray-600 mb-6">
          Is your pet a cat, dog or something else? This helps us adjust our advice perfectly.
        </p>

        {/* Pet Options */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`${theme.layout.button} bg-gray-300 text-black flex items-center space-x-2`}
            onClick={() => setSelectedPet("Cat")}
            style={{ opacity: selectedPet === "Cat" ? 1 : 0.6 }}
          >
            <FaCat />
            <span>Cat</span>
          </button>
          <button
            className={`${theme.layout.button} bg-gray-300 text-black flex items-center space-x-2`}
            onClick={() => setSelectedPet("Dog")}
            style={{ opacity: selectedPet === "Dog" ? 1 : 0.6 }}
          >
            <FaDog />
            <span>Dog</span>
          </button>
          <button
            className={`${theme.layout.button} bg-gray-300 text-black`}
            onClick={() => setSelectedPet("Other")}
            style={{ opacity: selectedPet === "Other" || (selectedPet && !["Cat", "Dog"].includes(selectedPet)) ? 1 : 0.6 }}
          >
            Other
          </button>
        </div>

        {(selectedPet === "Other" || (selectedPet && !["Cat", "Dog", ...otherPets].includes(selectedPet))) && (
          <div className="mb-6">
            {selectedPet === "Other" && (
              <>
                <p className="text-gray-600 mb-4">Select from options:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {otherPets.map(pet => (
                    <button
                      key={pet}
                      className={`${theme.layout.button} bg-gray-300 text-black`}
                      onClick={() => setSelectedPet(pet)}
                      style={{ opacity: selectedPet === pet ? 1 : 0.6 }}
                    >
                      {pet}
                    </button>
                  ))}
                </div>
              </>
            )}
            <input
              type="text"
              placeholder="Or enter your own pet type"
              value={selectedPet === "Other" ? "" : selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <NavigationButtons onBack={handleBack} onNext={handleNext} nextDisabled={!selectedPet || selectedPet === "Other"} />
      </div>
    </div>
  );
};

export default PetBasics;
