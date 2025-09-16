const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleCallback } = require('../controllers/profileController');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  googleCallback(profile, done);
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const User = require('../models/User');
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;