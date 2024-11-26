const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../zod/userSchema.js");

const register = async (req, res) => {
    try {
      const validatedData = userSchema.parse(req.body); 
      const { username, password, role } = validatedData;
      const isUserPresent = await User.findOne({ username });
      if(isUserPresent){
        return res.status(401).json({ message: "User already exists"});
      }
      const user = new User({ username, password, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600000
      });
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    logout
}