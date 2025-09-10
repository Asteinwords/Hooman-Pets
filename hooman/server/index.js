const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    });

    const User = mongoose.model('User', userSchema);

    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });

    app.post('/api/register', async (req, res) => {
      try {
        console.log('Registration request body:', req.body);
        const { name, email, password } = req.body;

        console.log('Checking if user exists with email:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log('User already exists:', email);
          return res.status(400).json({ message: 'User already exists' });
        }

        console.log('Hashing password');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating new user');
        const newUser = new User({ name, email, password: hashedPassword });

        console.log('Saving new user to database');
        await newUser.save();

        console.log('Registration successful for user:', email);
        res.json({ message: 'Registration successful', user: { name, email } });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error during registration', error: error.message });
      }
    });

    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
