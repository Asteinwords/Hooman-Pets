import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PetExperience from "./components/PetExperience";
import PetBasics from "./components/PetBasics";
import PetName from "./components/PetName";
import PetBreed from "./components/PetBreed";
import PetGender from "./components/PetGender";
import PetDOB from "./components/PetDOB";
import PetWeight from "./components/PetWeight";
import PetNeutered from "./components/PetNeutered";
import PetActivity from "./components/PetActivity";
import PetHealth from "./components/PetHealth";
import PetPriorities from "./components/PetPriorities";
import PetRoutines from "./components/PetRoutines";
import DashboardSetup from "./components/DashboardSetup";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PetExperience />} />
        <Route path="/profile/pet-experience" element={<PetExperience />} />
        <Route path="/profile/pet-basics" element={<PetBasics />} />
        <Route path="/profile/pet-name" element={<PetName />} />
        <Route path="/profile/pet-breed" element={<PetBreed />} />
        <Route path="/profile/pet-gender" element={<PetGender />} />
        <Route path="/profile/pet-age" element={<PetDOB />} />
        <Route path="/profile/pet-weight" element={<PetWeight />} />
        <Route path="/profile/pet-neutered" element={<PetNeutered />} />
        <Route path="/profile/pet-activity" element={<PetActivity />} />
        <Route path="/profile/pet-health" element={<PetHealth />} />
        <Route path="/profile/pet-priorities" element={<PetPriorities />} />
        <Route path="/profile/pet-routines" element={<PetRoutines />} />
        <Route path="/profile/dashboard-setup" element={<DashboardSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;