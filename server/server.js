const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Simplified User Schema (removed otpExpiry)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kumaryesu2000@gmail.com',
    pass: 'ixga egne lame zape'
  }
});

// Generate 5-digit OTP
function generateOTP() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Express app setup
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Registration endpoint
app.post('/api/users/register', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    const otp = generateOTP();

    if (user) {
      // Update existing user with new OTP
      user.otp = otp;
    } else {
      // Create new user
      user = new User({
        email,
        otp
      });
    }

    await user.save();

    // Send OTP email
    const mailOptions = {
      from: 'kumaryesu2000@gmail.com',
      to: email,
      subject: 'Email Verification OTP',
      html: `
        <h1>Email Verification</h1>
        <p>Your OTP for email verification is: <strong>${otp}</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error in registration process' });
  }
});


app.post('/api/users/verify', async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log('Received verification request:', { email, otp });
  
      const user = await User.findOne({ email });
      console.log('Found user:', user);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Check if OTP matches and is not undefined
      if (!user.otp || user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // Mark as verified
      user.isVerified = true;
      user.otp = undefined;  // Clear OTP after successful verification
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ message: 'Error in verification process' });
    }
  });

  

// Add resend OTP endpoint
app.post('/api/users/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOtp = generateOTP();
    user.otp = newOtp;
    await user.save();

    const mailOptions = {
      from: 'kumaryesu2000@gmail.com',
      to: email,
      subject: 'New Email Verification OTP',
      html: `
        <h1>Email Verification</h1>
        <p>Your new OTP for email verification is: <strong>${newOtp}</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'New OTP sent successfully' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Error in resending OTP' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});