import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import PetExperience from './components/PetExperience';
import PetBasics from './components/PetBasics';
import PetName from './components/PetName';
import PetBreed from './components/PetBreed';
import PetGender from './components/PetGender';
import PetDOB from './components/PetDOB.JSX';
import PetWeight from './components/PetWeight';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/pet-experience" element={<PetExperience />} />
        <Route path="/profile/pet-basics" element={<PetBasics />} />
        <Route path="/profile/pet-name" element={<PetName />} />
        <Route path="/profile/pet-breed" element={<PetBreed />} />
        <Route path="/profile/pet-gender" element={<PetGender />} />
        <Route path="/profile/pet-age" element={<PetDOB />} />
        <Route path="/profile/pet-weight" element={<PetWeight />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
