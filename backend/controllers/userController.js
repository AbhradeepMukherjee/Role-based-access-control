const User = require("../models/User.js");
const roleChangeSchema = require("../zod/roleSchema.js");
const bcrypt = require("bcryptjs");
//update user's role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = roleChangeSchema.parse(req.body);

    //ensure the requester is an admin
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Only admins can change user roles" });
    }

    if (!req.user.emailVerified) {
        return res
          .status(400)
          .json({ message: "Please verify your email" });
      }

    //find the user to update
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //apply promotion/demotion rules
    const validTransitions = {
      Admin: ["Editor", "Viewer"],
      Editor: ["Admin", "Viewer"],
      Viewer: ["Editor", "Admin"],
    };

    if (!validTransitions[user.role]?.includes(role)) {
      return res
        .status(400)
        .json({
          message: `Invalid role transition from ${user.role} to ${role}`,
        });
    }

    //update the user's role
    user.role = role;
    await user.save();

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

//get all users (admin only)
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not authorized to view users." });
    }
    const users = await User.find({ _id: { $ne: req.user._id } }) //exclude the current user
      .select("-password"); //exclude the password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (!user.emailVerified) {
        return res
          .status(400)
          .json({ message: "Please verify your email" });
    }

    if(!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  updateUserRole,
  getUsers,
  changePassword
};
