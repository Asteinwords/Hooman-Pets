import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";
import NavigationButtons from "./NavigationButtons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Used if needed for labels, but not in this component

const PetActivity = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [message, setMessage] = useState("");

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

  const handleActivitySelect = async (activity) => {
    setSelectedActivity(activity);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/pet-activity",
        { petActivity: activity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage("Selection saved: " + activity); // Red feedback
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save activity level");
    }
  };

  const handleBack = () => {
    navigate("/profile/pet-neutered");
  };

  const handleNext = () => {
    if (selectedActivity) {
      navigate("/profile/pet-health");
    } else {
      setMessage("Please select an activity level");
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
        <h1 className="text-4xl font-extrabold mb-2">How active is {petName || capitalizedPet}?</h1>
        <p className="text-gray-600 mb-6">
          This helps us recommend the right exercise and care routines.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Low", "Moderate", "High"].map((activity, index) => (
            <Button
              key={index}
              variant={selectedActivity === activity ? "default" : "outline"}
              className={`${theme.layout.button} bg-gray-200 text-black rounded-full px-4 py-2 text-sm ${selectedActivity === activity ? 'bg-orange-500 text-white' : ''}`}
              onClick={() => handleActivitySelect(activity)}
              disabled={selectedActivity && selectedActivity !== activity}
            >
              {activity}
            </Button>
          ))}
        </div>
        <NavigationButtons onBack={handleBack} onNext={handleNext} nextDisabled={!selectedActivity} />
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PetActivity;