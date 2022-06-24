const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Create a new user
router.post("/user/new", async (req, res) => {
    const { name, email, password, phone } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ failure: 400 });
    }
    user = new User({
      name,
      email,
      password,
      phone
    });
    var new_user=await user.save();
    res.json({ Success: 200,data:new_user });
});

//get single user details
router.post("/user/details", async (req, res) => {
    var email = req.body.email;
    const doc = await User.findOne({ email: email });
    res.json({ Success: 200,data:doc });
  });

  module.exports = router;