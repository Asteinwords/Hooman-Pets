import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Input } from "@/components/ui/input";

const PetName = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPetType(res.data.data.petType || "dog");
        if (res.data.data.petName) {
          setPetName(res.data.data.petName);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleBack = () => {
    navigate("/profile/pet-basics");
  };

  const handleNext = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/pet-name",
        { petName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate("/profile/pet-breed");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save pet name");
    }
  };

  const capitalizedPet = petType.charAt(0).toUpperCase() + petType.slice(1);
return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>
        <div className="h-1 bg-[#E95744] mb-6 rounded-full" style={{ width: "100%" }}></div>
        <p className="text-sm text-gray-600 mb-2">Pet Basics</p>
        <h1 className="text-4xl font-extrabold mb-2">What is your {capitalizedPet}'s name?</h1>
        <p className="text-gray-600 mb-6">
          Let’s give your pet a voice, knowing their name helps us personalise every interaction.
        </p>
        <Input
          type="text"
          placeholder={`Ex. ${capitalizedPet === "Dog" ? "Max" : "Luna"}`}
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-200 placeholder-gray-500"
        />
        <div className="mt-6">
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={!petName.trim()}
          />
        </div>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};
export default PetName;