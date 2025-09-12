import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../theme";
import logo from "../assets/Group 10703.png";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/pet-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load dashboard data");
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Profile Summary */}
        <h1 className="text-4xl font-extrabold mb-4">Your Pet's Dashboard</h1>
        <div className="space-y-4">
          <p><strong>Pet Type:</strong> {profile.petType || "Not set"}</p>
          <p><strong>Pet Name:</strong> {profile.petName || "Not set"}</p>
          <p><strong>Breed:</strong> {profile.petBreed || "Not set"}</p>
          <p><strong>Gender:</strong> {profile.petGender || "Not set"}</p>
          <p><strong>DOB:</strong> {profile.petDOB ? new Date(profile.petDOB).toLocaleDateString() : "Not set"}</p>
          <p><strong>Weight:</strong> {profile.petWeight ? `${profile.petWeight} kg` : "Not set"}</p>
          <p><strong>Spayed/Neutered:</strong> {profile.petNeutered || "Not set"}</p>
          <p><strong>Health Conditions:</strong> {profile.petConditions.length > 0 ? profile.petConditions.join(", ") : "None"}</p>
          <p><strong>Priorities:</strong> {profile.petPriorities.length > 0 ? profile.petPriorities.join(", ") : "None"}</p>
          <p><strong>Routines:</strong> {profile.petRoutines.length > 0 ? profile.petRoutines.join(", ") : "None"}</p>
        </div>

        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Dashboard;