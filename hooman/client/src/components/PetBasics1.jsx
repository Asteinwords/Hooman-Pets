import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import { FaCat, FaDog } from "react-icons/fa";
import NavigationButtons from "./NavigationButtons";

const PetBasics1 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPet, setSelectedPet] = useState("");
  const [petName, setPetName] = useState("");
  const [message, setMessage] = useState("");
  const otherPets = ['Bird', 'Fish', 'Rabbit', 'Hamster'];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.data.data.petType) {
          setSelectedPet(res.data.data.petType);
        }
        if (res.data.data.petName) {
          setPetName(res.data.data.petName);
          setStep(2);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handlePetSelect = async (pet) => {
    setSelectedPet(pet);
    try {
      await axios.post(
        "http://localhost:5000/api/profile/pet-basics",
        { petType: pet },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save pet type");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate("/profile/pet-experience");
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      if (selectedPet && selectedPet !== "Other") {
        setStep(2);
      } else {
        setMessage("Please select a valid pet type");
      }
    } else if (step === 2) {
      try {
        await axios.post(
          "http://localhost:5000/api/profile/pet-name",
          { petName },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        navigate("/dashboard");
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to save pet name");
      }
    }
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: step === 1 ? "90%" : "100%" }}></div>
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        {step === 1 && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">What kind of pet do you have?</h1>
            <p className="text-gray-600 mb-6">
              Is your pet a cat, dog or something else? This helps us adjust our advice perfectly.
            </p>
            <div className="flex space-x-4 mb-6">
              <button
                className={`${theme.layout.button} bg-gray-300 text-black flex items-center space-x-2`}
                onClick={() => handlePetSelect("Cat")}
                style={{ opacity: selectedPet === "Cat" ? 1 : 0.6 }}
              >
                <FaCat />
                <span>Cat</span>
              </button>
              <button
                className={`${theme.layout.button} bg-gray-300 text-black flex items-center space-x-2`}
                onClick={() => handlePetSelect("Dog")}
                style={{ opacity: selectedPet === "Dog" ? 1 : 0.6 }}
              >
                <FaDog />
                <span>Dog</span>
              </button>
              <button
                className={`${theme.layout.button} bg-gray-300 text-black`}
                onClick={() => handlePetSelect("Other")}
                style={{
                  opacity:
                    selectedPet === "Other" ||
                    (selectedPet && !["Cat", "Dog"].includes(selectedPet))
                      ? 1
                      : 0.6,
                }}
              >
                Other
              </button>
            </div>
            {(selectedPet === "Other" ||
              (selectedPet && !["Cat", "Dog", ...otherPets].includes(selectedPet))) && (
              <div className="mb-6">
                {selectedPet === "Other" && (
                  <>
                    <p className="text-gray-600 mb-4">Select from options:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {otherPets.map((pet) => (
                        <button
                          key={pet}
                          className={`${theme.layout.button} bg-gray-300 text-black`}
                          onClick={() => handlePetSelect(pet)}
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
                  onChange={(e) => handlePetSelect(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">What is your pet's name?</h1>
            <p className="text-gray-600 mb-6">
              Let’s give your pet a voice, knowing their name helps us personalise every interaction.
            </p>
            <input
              id="petName"
              type="text"
              placeholder="Ex. Coco"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 placeholder-gray-500"
            />
          </>
        )}
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={step === 1 ? !selectedPet || selectedPet === "Other" : !petName}
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetBasics1;