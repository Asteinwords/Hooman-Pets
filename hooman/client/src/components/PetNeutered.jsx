import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";

const PetNeutered = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [selectedNeutered, setSelectedNeutered] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petNeutered) {
          setSelectedNeutered(res.data.data.petNeutered);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleNeuteredSelect = async (neutered) => {
    setSelectedNeutered(neutered);
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-neutered",
        { petNeutered: neutered },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Selection saved: " + neutered); // Red feedback
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save neutered status");
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-weight");
  };

  const handleNext = () => {
    if (selectedNeutered) {
      navigate("/profile/pet-activity");
    } else {
      setMessage("Please select an option");
    }
  };

  const capitalizedPet = petType.charAt(0).toUpperCase() + petType.slice(1);

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "100%" }}></div>
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">Is your {capitalizedPet} spayed or neutered?</h1>
        <p className="text-gray-600 mb-6">
          This helps us tailor health and care advice.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Yes", "No", "Unknown"].map((option, index) => (
            <button
              key={index}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${selectedNeutered === option ? 'bg-orange-500 text-white' : ''}`}
              onClick={() => handleNeuteredSelect(option)}
              disabled={selectedNeutered && selectedNeutered !== option}
            >
              {option}
            </button>
          ))}
        </div>
        <NavigationButtons onBack={handleBack} onNext={handleNext} nextDisabled={!selectedNeutered} />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetNeutered;