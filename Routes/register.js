const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../mongodb/mongo2");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      email: email,
      password: hash,
    }).then(() => {
        res.json("User Registered");
      }).catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

module.exports=router;