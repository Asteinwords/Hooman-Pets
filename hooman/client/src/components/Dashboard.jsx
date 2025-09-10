import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group 10703.png";
import theme from "../theme.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className={`${theme.colors.background} min-h-screen flex items-start justify-start`}>
      <div className="w-full max-w-4xl p-8">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <img src={logo} alt="Hooman Logo" className="h-12" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-left mb-6">Dashboard</h2>

        {/* Welcome Message */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Welcome to Your Dashboard!</h3>
          <p className="text-gray-600 mb-4">
            This is your personal dashboard. You can add widgets, view your profile, or manage your settings here.
          </p>
          <button
            onClick={handleLogout}
            className={`${theme.layout.button} w-auto px-4 py-2`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;