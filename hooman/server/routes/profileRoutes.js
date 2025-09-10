const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  loginUser,
  registerUser,
  updatePetExperience,
  updatePetType,
  updatePetName,
  getPetProfile,
    updatePetBreed,
    updatePetGender,
    updatePetDOB,
    updatePetWeight
} = require('../controllers/profileController');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes
router.use(protect);
router.post('/pet-experience', updatePetExperience);
router.post('/pet-basics', updatePetType);
router.post('/pet-name', updatePetName);
router.post('/pet-gender', updatePetGender);
router.post('/pet-breed', updatePetBreed);
router.post('/pet-dob', updatePetDOB); // New
router.post('/pet-weight', updatePetWeight);
router.get('/pet-profile', getPetProfile);

module.exports = router;