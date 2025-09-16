import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";

const PetRoutines = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [selectedRoutines, setSelectedRoutines] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petRoutines) {
          setSelectedRoutines(res.data.data.petRoutines);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleRoutineSelect = (routine) => {
    setSelectedRoutines((prev) =>
      prev.includes(routine)
        ? prev.filter((r) => r !== routine)
        : [...prev, routine]
    );
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/pet-routines",
        { petRoutines: selectedRoutines },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Routines saved successfully");
      return true;
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save routines");
      return false;
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-priorities");
  };

  const handleNext = async () => {
    if (selectedRoutines.length === 0) {
      setMessage("Please select at least one routine");
      return;
    }
    const saved = await handleSave();
    if (saved) {
      navigate("/profile/dashboard-setup");
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
        <h1 className="text-4xl font-extrabold mb-2">Do you have any daily routines?</h1>
        <p className="text-gray-600 mb-6">
          Share your pet's regular habits—like walks, feeding times, or cuddle sessions—to shape your personalised care schedule.
        </p>

        {/* Routine Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"].map((routine, index) => (
            <Button
              key={index}
              variant={selectedRoutines.includes(routine) ? "default" : "outline"}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${
                selectedRoutines.includes(routine) ? 'bg-orange-500 text-white' : ''
              } hover:bg-gray-300 transition-colors`}
              onClick={() => handleRoutineSelect(routine)}
            >
              {routine}
            </Button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={selectedRoutines.length === 0} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};
export default PetRoutines;