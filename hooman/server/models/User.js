const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: false, // Make password optional for Google users
  },
  googleId: {
    type: String,
    default: null,
  },
  googlePicture: {
    type: String,
    default: null,
  },
  petExperience: {
    type: String,
    enum: ['experienced', 'firstTime'],
    default: null,
  },
  petType: {
    type: String,
    default: null,
  },
  petName: {
    type: String,
    trim: true,
    default: null,
  },
  petBreed: {
    type: String,
    default: null,
  },
  petGender: {
    type: String,
    enum: ["Male", "Female", "Unknown"],
    default: null,
  },
  petDOB: {
    type: Date,
    default: null,
  },
  petWeight: {
    type: Number,
    default: null,
  },
  petNeutered: {
    type: String,
    enum: ["Yes", "No", "Unknown"],
    default: null,
  },
  petActivity: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    default: null,
  },
  petConditions: {
    type: [String],
    enum: ["Allergies", "Mobility", "Diabetes", "Other", "Joint Issues", "Skin Conditions", "Digestive/Gastrointestinal Concerns"],
    default: [],
  },
  petPriorities: {
    type: [String],
    enum: ["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"],
    default: [],
  },
  petRoutines: {
    type: [String],
    enum: ["Daily Care Tips", "Exercise", "Play ideas", "Nutritional & Diet Advice", "Grooming & Hygiene Routines", "Health & Preventative Care", "Other"],
    default: [],
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) {
    return false; // Google users have no password
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);