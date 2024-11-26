const mongoose = require("mongoose");
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected.");
  } catch (err) {
    console.log(err);
  }
};

module.exports = start;