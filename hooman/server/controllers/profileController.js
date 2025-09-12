const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Auth user & get token
// @route   POST /api/profile/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) { // Now uses the method
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/profile/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  }); // The pre-save hook will hash the password

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update pet experience
// @route   POST /api/profile/pet-experience
// @access  Private
exports.updatePetExperience = asyncHandler(async (req, res) => {
  const { petExperience } = req.body;

  if (!petExperience || !["experienced", "firstTime"].includes(petExperience)) {
    return res.status(400).json({ message: "Invalid pet experience" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petExperience = petExperience;
  await user.save();

  res.status(200).json({
    message: "Pet experience updated successfully",
    data: { petExperience: user.petExperience },
  });
});

// @desc    Update pet type
// @route   POST /api/profile/pet-basics
// @access  Private
exports.updatePetType = asyncHandler(async (req, res) => {
  const { petType } = req.body;

  if (!petType || !["dog", "cat"].includes(petType.toLowerCase())) {
    return res.status(400).json({ message: "Invalid pet type" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petType = petType.toLowerCase();
  await user.save();

  res.status(200).json({
    message: "Pet type updated successfully",
    data: { petType: user.petType },
  });
});

// @desc    Update pet name
// @route   POST /api/profile/pet-name
// @access  Private
exports.updatePetName = asyncHandler(async (req, res) => {
  const { petName } = req.body;

  if (!petName || typeof petName !== "string" || petName.trim() === "") {
    return res.status(400).json({ message: "Invalid pet name" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petName = petName.trim();
  await user.save();

  res.status(200).json({
    message: "Pet name updated successfully",
    data: { petName: user.petName },
  });
});

// @desc    Update pet breed
// @route   POST /api/profile/pet-breed
// @access  Private
exports.updatePetBreed = asyncHandler(async (req, res) => {
  const { petBreed } = req.body;

  if (!petBreed || typeof petBreed !== "string" || petBreed.trim() === "") {
    return res.status(400).json({ message: "Invalid breed" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petBreed = petBreed.trim();
  await user.save();

  res.status(200).json({
    message: "Breed updated successfully",
    data: { petBreed: user.petBreed },
  });
});

// @desc    Update pet gender
// @route   POST /api/profile/pet-gender
// @access  Private
exports.updatePetGender = asyncHandler(async (req, res) => {
  const { petGender } = req.body;

  if (!petGender || !["Male", "Female", "Unknown"].includes(petGender)) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petGender = petGender;
  await user.save();

  res.status(200).json({
    message: "Gender updated successfully",
    data: { petGender: user.petGender },
  });
});

// @desc    Update pet date of birth
// @route   POST /api/profile/pet-dob
// @access  Private
exports.updatePetDOB = asyncHandler(async (req, res) => {
  const { petDOB } = req.body;

  if (!petDOB || isNaN(Date.parse(petDOB))) {
    return res.status(400).json({ message: "Invalid date of birth" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petDOB = new Date(petDOB);
  await user.save();

  res.status(200).json({
    message: "Date of birth updated successfully",
    data: { petDOB: user.petDOB },
  });
});

// @desc    Update pet weight
// @route   POST /api/profile/pet-weight
// @access  Private
exports.updatePetWeight = asyncHandler(async (req, res) => {
  const { petWeight } = req.body;

  if (!petWeight || isNaN(petWeight) || petWeight <= 0) {
    return res.status(400).json({ message: "Invalid weight" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petWeight = Number(petWeight);
  await user.save();

  res.status(200).json({
    message: "Weight updated successfully",
    data: { petWeight: user.petWeight },
  });
});

// @desc    Update pet neutered status
// @route   POST /api/profile/pet-neutered
// @access  Private
exports.updatePetNeutered = asyncHandler(async (req, res) => {
  const { petNeutered } = req.body;

  if (!petNeutered || !["Yes", "No", "Unknown"].includes(petNeutered)) {
    return res.status(400).json({ message: "Invalid neutered status" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petNeutered = petNeutered;
  await user.save();

  res.status(200).json({
    message: "Neutered status updated successfully",
    data: { petNeutered: user.petNeutered },
  });
});

// @desc    Update pet activity level
// @route   POST /api/profile/pet-activity
// @access  Private
exports.updatePetActivity = asyncHandler(async (req, res) => {
  const { petActivity } = req.body;

  if (!petActivity || !["Low", "Moderate", "High"].includes(petActivity)) {
    return res.status(400).json({ message: "Invalid activity level" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petActivity = petActivity;
  await user.save();

  res.status(200).json({
    message: "Activity level updated successfully",
    data: { petActivity: user.petActivity },
  });
});

// @desc    Update pet health conditions
// @route   POST /api/profile/pet-health
// @access  Private
exports.updatePetHealth = asyncHandler(async (req, res) => {
  const { petConditions } = req.body;

  if (!Array.isArray(petConditions) || !petConditions.every(cond => 
    ["Allergies", "Mobility", "Diabetes", "Other", "Joint Issues", "Skin Conditions", "Digestive/Gastrointestinal Concerns"].includes(cond))) {
    return res.status(400).json({ message: "Invalid health conditions" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petConditions = petConditions;
  await user.save();

  res.status(200).json({
    message: "Health conditions updated successfully",
    data: { petConditions: user.petConditions },
  });
});

// @desc    Update pet priorities
// @route   POST /api/profile/pet-priorities
// @access  Private
exports.updatePetPriorities = asyncHandler(async (req, res) => {
  const { petPriorities } = req.body;

  if (!Array.isArray(petPriorities) || !petPriorities.every(prior => 
    ["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"].includes(prior))) {
    return res.status(400).json({ message: "Invalid priorities" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petPriorities = petPriorities;
  await user.save();

  res.status(200).json({
    message: "Priorities updated successfully",
    data: { petPriorities: user.petPriorities },
  });
});

// @desc    Update pet routines
// @route   POST /api/profile/pet-routines
// @access  Private
exports.updatePetRoutines = asyncHandler(async (req, res) => {
  const { petRoutines } = req.body;

  if (!Array.isArray(petRoutines) || !petRoutines.every(routine => 
    ["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"].includes(routine))) {
    return res.status(400).json({ message: "Invalid routines" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.petRoutines = petRoutines;
  await user.save();

  res.status(200).json({
    message: "Routines updated successfully",
    data: { petRoutines: user.petRoutines },
  });
});

// @desc    Get pet profile
// @route   GET /api/profile/pet-profile
// @access  Private
exports.getPetProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "petExperience petType petName petBreed petGender petDOB petWeight petNeutered petActivity petConditions petPriorities petRoutines"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "Pet profile retrieved successfully",
    data: {
      petExperience: user.petExperience,
      petType: user.petType,
      petName: user.petName,
      petBreed: user.petBreed,
      petGender: user.petGender,
      petDOB: user.petDOB,
      petWeight: user.petWeight,
      petNeutered: user.petNeutered,
      petActivity: user.petActivity,
      petConditions: user.petConditions,
      petPriorities: user.petPriorities,
      petRoutines: user.petRoutines,
    },
  });
});