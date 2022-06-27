const express = require("express");
const router = express.Router();

const GroceryCategory = require("../models/groceryCategory");

//Add new Category
router.post("/gcategory/new", async (req, res) => {
    const { name, active } = req.body;
    user = new GroceryCategory({
        name,
        active
    });
    var new_category = await user.save();
    res.json({ Success: 200, data: new_category });
});

//get All grocey Items
router.get("/gcategories", async (req, res) => {
    try {
        await GroceryCategory.find({ active: true }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 200, data: data });
            }
        });
    } catch (e) {
        console.log(e.message);
    }

});

//update grocery category
router.put("/gcategory/update", async (req, res) => {
    try {
        var x = await GroceryCategory.where({ _id: req.body._id }).updateOne({
            $set: req.body,
        });
        res.json({ success: 200, data: x });
    } catch (e) {
        res.json({ success: 500 });
    }
});

module.exports = router;