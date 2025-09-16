const express = require('express');
const router = express.Router();
const passport = require('passport');
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
  updatePetWeight,
  updatePetHealth,
  updatePetPriorities,
  updatePetRoutines,
  updatePetNeutered,
  updatePetActivity,
  googleAuthSuccess,
  googleAuthFail,
} = require('../controllers/profileController');
const generateToken = require('../utils/generateToken');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/api/auth/google/failure',
  session: false,
}), (req, res) => {
  const token = req.user ? generateToken(req.user._id) : null;
  if (token) {
    res.redirect(`http://localhost:5173/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.googlePicture,
    }))}`);
  } else {
    res.redirect('http://localhost:5173/login?error=auth_failed');
  }
});

// Google auth success/failure endpoints
router.get('/google/success', passport.authenticate('google', { session: false }), googleAuthSuccess);
router.get('/google/failure', googleAuthFail);

// Protected routes
router.use(protect);
router.post('/pet-experience', updatePetExperience);
router.post('/pet-basics', updatePetType);
router.post('/pet-name', updatePetName);
router.post('/pet-gender', updatePetGender);
router.post('/pet-breed', updatePetBreed);
router.post('/pet-dob', updatePetDOB);
router.post('/pet-health', updatePetHealth);
router.post('/pet-weight', updatePetWeight);
router.get('/pet-profile', getPetProfile);
router.post('/pet-priorities', updatePetPriorities);
router.post('/pet-neutered', updatePetNeutered);
router.post('/pet-activity', updatePetActivity);
router.post('/pet-routines', updatePetRoutines);

module.exports = router;