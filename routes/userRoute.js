const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require('dotenv').config(); 
const User = require("../models/user");

//Create a new user
router.post("/user/new", async (req, res) => {
    const { name, email, password, phone, usertype } = req.body;
    try{
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ fail: 100, message: "user found" });
    }
    user = new User({
      name,
      email,
      password,
      phone,
      usertype
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email:user.email,
        name:name
      }
    };
    jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: 60*60*24*7 },(err, token)=>{
      if (err) throw err;

      res.json({ token, payload });
    })
  }catch(e){
    console.error(err.message);
    res.json({ success: 500 });
  }
});
//Verify JWT TOKEN
router.post("/user/checktoken", async (req, res) => {
  //check token 
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json({ success: 500 });
    }else{
      res.json({ success: 200 });
    }
  });
})
//check user during Logging
router.post("/user/logging", async (req, res) => {
  try{
  var user = await User.findOne({ email: req.body.email });
  console.log(user);
  if(!user){
    res.json({ success:403, message:"User Not Found" });
  }
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (matchPassword) {
    const payload = {
      user: {
        id: doc.id,
        email:doc.email,
        name:doc.name
      }
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 60*60*24*7 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      }
    );
  }else{
    res.json({ success:403, message:"Incorrect Password" });
  }
}catch(e){
  console.log(e.message)
}
})

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

//update profile
router.put("/user/update", async (req, res) => {
  try {
    var body = req.body;
    if(body.hasOwnProperty('password')){
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    var x = await User.where({ email: req.body.email }).updateOne({
      $set: body,
    });
    res.json({ success: 200, data: x._id });
  } catch (e) {
    res.json({ success: 500 });
  }
});

  module.exports = router;