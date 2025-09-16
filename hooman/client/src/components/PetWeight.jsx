import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Input } from "@/components/ui/input";

const PetWeight = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");
  const [petName, setPetName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log("Fetched profile:", res.data.data); // Debug log
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petWeight) {
          setWeight(res.data.data.petWeight.toString()); // Convert to string for input
        }
      } catch (err) {
        console.error("Fetch error:", err); // Debug log
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


  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSave = async () => {
    if (!weight || isNaN(weight) || weight <= 0) {
      setMessage("Please enter a valid weight");
      return false;
    }
    try {
      console.log("Saving weight:", weight); // Debug log
      const res = await axios.post(
        "http://localhost:5000/api/auth/pet-weight",
        { petWeight: Number(weight) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log("Save response:", res.data); // Debug log
      setMessage("Weight saved successfully");
      return true;
    } catch (err) {
      console.error("Save error:", err.response?.data); // Debug log
      setMessage(err.response?.data?.message || "Failed to save weight");
      return false;
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-age");
  };

  const handleNext = async () => {
    if (!weight || isNaN(weight) || weight <= 0) {
      setMessage("Please enter a valid weight");
      return;
    }
    const saved = await handleSave();
    if (saved) {
      navigate("/profile/pet-neutered");
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
        <h1 className="text-4xl font-extrabold mb-2">What is the weight of {petName || capitalizedPet}?</h1>
        <p className="text-gray-600 mb-6">
          Weight information helps us tailor nutrition and health advice for your pet.
        </p>

        {/* Weight Input */}
        <Input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter weight in kg"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          min="0"
          step="0.1"
        />

        {/* Navigation Buttons */}
        <NavigationButtons 
          onBack={handleBack} 
          onNext={handleNext} 
          nextDisabled={!weight || isNaN(weight) || weight <= 0} 
        />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};
export default PetWeight;