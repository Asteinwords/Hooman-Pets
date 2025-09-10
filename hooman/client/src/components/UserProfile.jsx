import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import logo from "../assets/Group 10703.png";

const UserProfile = () => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to save the full name if needed
    navigate("/profile/pet-experience");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-orange-500 mb-6 rounded-full" style={{ width: "30%" }}></div>

        {/* User Profile Text */}
        <p className="text-sm text-gray-600 mb-2">User Profile</p>
        <h1 className="text-4xl font-extrabold mb-2">What is your full name?</h1>
        <p className="text-gray-600 mb-6">
          Tell us your full name so we can greet you in a friendly, personal way.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex...Josh Steve"
            className={`${theme.layout.input} bg-gray-300 placeholder-gray-500`}
            required
          />
          <div className="flex justify-end mt-6">
            <button type="submit" className={`${theme.layout.button} bg-orange-500 hover:bg-orange-600`}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
