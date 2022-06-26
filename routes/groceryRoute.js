const express = require("express");
const router = express.Router();

const Grocery = require("../models/groceryItems")

//Add new Grocery Item
router.post("/grocery/new", async (req, res) => {
    const { name, grocerytype } = req.body;
    user = new Grocery({
        name,
        grocerytype
    });
    var new_grocery = await user.save();
    res.json({ Success: 200, data: new_grocery });
});

//get All grocey Items
router.get("/groceries", async (req, res) => {
    await Grocery.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ success: 200, data: data });
        }
    });
});

module.exports = router;