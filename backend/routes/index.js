const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.js"));
router.use("/posts", require("./posts.js"));

module.exports = router;