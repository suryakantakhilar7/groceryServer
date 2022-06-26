const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Create a new user
router.post("/user/new", async (req, res) => {
    const { name, email, password, phone, usertype } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ failure: 400 });
    }
    user = new User({
      name,
      email,
      password,
      phone,
      usertype
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

  //get All Users
router.get("/all/users", async (req, res) => {
  await User.find({}, (err, data) => {
      if (err) {
          console.log(err);
      } else {
          res.json({ success: 200, data: data });
      }
  });
});

  module.exports = router;