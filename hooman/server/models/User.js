const mongoose = require('mongoose');

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
    required: true,
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
  },petGender: {
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
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);