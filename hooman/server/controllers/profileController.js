const User = require('../models/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      message: 'Login successful', 
      user: { name: user.name, email: user.email },
      token 
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register user or update name
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (req.user) {
    // Update name for authenticated user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name.trim();
    await user.save();
    return res.json({ message: 'Name updated successfully', user: { name: user.name, email: user.email } });
  }

  // Register new user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ message: 'Registration successful', user: { name, email }, token });
});

// Update pet experience
exports.updatePetExperience = asyncHandler(async (req, res) => {
  const { experience } = req.body;

  if (!['experienced', 'firstTime'].includes(experience)) {
    return res.status(400).json({ message: 'Invalid experience level' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petExperience = experience;
  await user.save();

  res.status(200).json({ 
    message: 'Pet experience updated successfully',
    data: { petExperience: user.petExperience }
  });
});

// Update pet type
exports.updatePetType = asyncHandler(async (req, res) => {
  const { petType } = req.body;

  if (!petType || petType.trim() === '') {
    return res.status(400).json({ message: 'Pet type is required' });
  }

  const normalizedType = petType === 'Other' ? null : petType.trim();
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petType = normalizedType;
  await user.save();

  res.status(200).json({ 
    message: 'Pet type updated successfully',
    data: { petType: user.petType }
  });
});

// Update pet name
exports.updatePetName = asyncHandler(async (req, res) => {
  const { petName } = req.body;

  if (!petName || petName.trim() === '') {
    return res.status(400).json({ message: 'Pet name is required' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petName = petName.trim();
  await user.save();

  res.status(200).json({ 
    message: 'Pet name updated successfully',
    data: { petName: user.petName }
  });
});

// Get pet profile
exports.getPetProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('name petExperience petType petName');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    data: {
      name: user.name,
      petExperience: user.petExperience,
      petType: user.petType,
      petName: user.petName,
    }
  });
});
// Update pet breed
exports.updatePetBreed = asyncHandler(async (req, res) => {
  const { petBreed } = req.body;

  if (!petBreed || petBreed.trim() === '') {
    return res.status(400).json({ message: 'Pet breed is required' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petBreed = petBreed.trim();
  await user.save();

  res.status(200).json({ 
    message: 'Pet breed updated successfully',
    data: { petBreed: user.petBreed }
  });
});// Update pet gender
exports.updatePetGender = asyncHandler(async (req, res) => {
  const { petGender } = req.body;

  if (!petGender || !["Male", "Female", "Unknown"].includes(petGender)) {
    return res.status(400).json({ message: 'Invalid gender selection' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petGender = petGender;
  await user.save();

  res.status(200).json({ 
    message: 'Pet gender updated successfully',
    data: { petGender: user.petGender }
  });
});
// Update pet date of birth
exports.updatePetDOB = asyncHandler(async (req, res) => {
  const { petDOB } = req.body;

  if (!petDOB) {
    return res.status(400).json({ message: 'Date of birth is required' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petDOB = new Date(petDOB);
  await user.save();

  res.status(200).json({ 
    message: 'Date of birth updated successfully',
    data: { petDOB: user.petDOB }
  });
});

// Update pet weight
exports.updatePetWeight = asyncHandler(async (req, res) => {
  const { petWeight } = req.body;

  if (!petWeight || isNaN(petWeight) || petWeight <= 0) {
    return res.status(400).json({ message: 'Invalid weight value' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.petWeight = Number(petWeight);
  await user.save();

  res.status(200).json({ 
    message: 'Weight updated successfully',
    data: { petWeight: user.petWeight }
  });
});

// Update getPetProfile to include petDOB and petWeight
exports.getPetProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('name petExperience petType petName petBreed petGender petDOB petWeight');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    data: {
      name: user.name,
      petExperience: user.petExperience,
      petType: user.petType,
      petName: user.petName,
      petBreed: user.petBreed,
      petGender: user.petGender,
      petDOB: user.petDOB,
      petWeight: user.petWeight,
    }
  });
});