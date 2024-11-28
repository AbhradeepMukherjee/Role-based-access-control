const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../zod/userSchema.js");
const { z } = require("zod");
const { sendEmail } = require("../config/nodemailer.js");
const generateOTP = require("../config/otpGenerator.js");

const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validatedData = userSchema.parse(req.body);
    const { email, username, password, role } = validatedData;
    const isUserPresent = await User.findOne({ username });
    if (isUserPresent) {
      return res.status(403).json({ message: "User already exists" });
    }
    const user = new User({
      email,
      username,
      password,
      role,
    });
    await user.save();

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(email, user.username, otp);

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: user._id,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = await User.findOne({ email });
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log(email, user.email, password, user.password, matchPassword);
    if (!user || !matchPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 86400000,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!otp) {
      return res.status(401).json({ message: "OTP required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.emailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email first.",
      });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(email, user.username, otp);

    res.status(201).json({
      message: "OTP successfully sent to mail",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, token } = req.body;

    let formData = new FormData();
    formData.append("secret", process.env.SECRET_KEY);
    formData.append("response", token);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });
    const challengeSucceeded = (await result.json()).success;

    if (!challengeSucceeded) {
      return res.status(403).json({ message: "Invalid reCAPTCHA token" });
    }

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.emailVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email before logging in." });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  generateOtp,
  resetPassword,
};
