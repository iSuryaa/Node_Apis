const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../mongodb/mongo2");
const{createTokens}=require('../JWT')




router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    const data = await users.findOne({  email: email});
     console.log(data)
    if (!data) {
        return res.status(400).json({ error: "User Doesn't Exist" });
    }
    const dbPassword = data.password;

    if (!dbPassword) {
        return res.status(400).json({ error: "No password found for the user" });
    }

    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({ error: "Wrong Username and Password Combination!" });
        } else {
            const accessToken = createTokens(data);
            
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
            });

            res.json("LOG IN");
        }
    });
});

router.get("/", async (req, res) => {
    try {
      const user = await users.find();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  module.exports=router;