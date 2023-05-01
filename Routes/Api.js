const express = require("express");
const router = express.Router();
const Item = require("../mongodb/mongo");

router.post("/", async (req, res) => {
  try {
    const { name, type, code, description, checked } = req.body;

    const newItem = new Item({ name, type, code, description, checked });
    await newItem.save();

    res.json({ message: "Create successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { name, type, code, description, checked } = req.body;
    const { id } = req.params;

    const items = await Item.findByIdAndUpdate(
      id,
      { name, type, code, description, checked },
      { new: true }
    );

    res.json({ message: "Edit successful", items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Item.findById(id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }
    res.json(user); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" }); 
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await Item.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
