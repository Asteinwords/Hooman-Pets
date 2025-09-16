const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (user.googleId && !user.password) {
      res.status(401);
      throw new Error("This account uses Google login. Please use Google to sign in.");
    }
    if (await user.matchPassword(password)) {
      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.googlePicture || null,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received registration data:", { name, email, password: password ? '[hidden]' : undefined });

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        message: "Registration successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.googlePicture || null,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500);
    throw new Error("Server error during user creation");
  }
});

// Google OAuth callback handler
exports.googleCallback = asyncHandler(async (profile, done) => {
  try {
    console.log('Google profile:', profile);
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      console.log('User found with Google ID:', user.googleId);
      return done(null, user);
    } else {
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleId = profile.id;
        user.name = profile.displayName || user.name;
        user.googlePicture = profile.photos[0].value;
        await user.save();
        console.log('Updated existing user with Google info:', user.email);
        return done(null, user);
      } else {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          googlePicture: profile.photos[0].value,
        });
        console.log('Created new user with Google auth:', user.email);
        return done(null, user);
      }
    }
  } catch (error) {
    console.error('Error in Google strategy:', error);
    return done(error, null);
  }
});

exports.googleAuthSuccess = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Google login successful",
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.googlePicture || null,
      token: generateToken(req.user._id),
    });
  } else {
    res.status(400).json({ message: "Authentication failed" });
  }
});

exports.googleAuthFail = asyncHandler(async (req, res) => {
  res.redirect('http://localhost:5173/login?error=auth_failed');
});

// Remaining controller functions (unchanged)
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