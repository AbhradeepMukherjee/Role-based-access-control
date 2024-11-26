const User = require('../models/User.js');
const roleChangeSchema = require("../zod/roleSchema.js");

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; 
    const { role } = roleChangeSchema.parse(req.body);

    //ensure the requester is an admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can change user roles' });
    }

    //find the user to update
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //apply promotion/demotion rules
    const validTransitions = {
      Admin: ['Editor', 'Viewer'], 
      Editor: ['Admin', 'Viewer'], 
      Viewer: ['Editor', 'Admin'],
    };

    if (!validTransitions[user.role]?.includes(role)) {
      return res.status(400).json({ message: `Invalid role transition from ${user.role} to ${role}` });
    }

    //update the user's role
    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  updateUserRole,
};
