const express = require("express");
const router = express.Router();

const Grocery = require("../models/groceryItems")

//Add new Grocery Item
router.post("/grocery/new", async (req, res) => {
  const { name, grocerytype, price, unit, instock } = req.body;
  user = new Grocery({
    name,
    grocerytype,
    price,
    unit,
    instock
  });
  var new_grocery = await user.save();
  res.json({ Success: 200, data: new_grocery });
});

//get All grocey Items
router.get("/groceries", async (req, res) => {
  /*await Grocery.find({}, (err, data) => {
      if (err) {
          console.log(err);
      } else {
          res.json({ success: 200, data: data });
      }
  });*/
  try {
    await Grocery.find({}).populate("grocerytype").exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: 200, data: data });
      }
    })
  } catch (e) {
    console.log(e.message)
  }
});

//update grocery item
router.put("/grocery/update", async (req, res) => {
  try {
    var x = await Grocery.where({ _id: req.body._id }).updateOne({
      $set: req.body,
    });
    res.json({ success: 200, data: x });
  } catch (e) {
    res.json({ success: 500 });
  }
});

module.exports = router;