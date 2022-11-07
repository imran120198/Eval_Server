const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const ip_address =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  bcrypt.hash(password, 6, async (err, hash) => {
    if (err) {
      res.send("Please Try Again");
    }
    const user = new UserModel({
      email,
      password: hash,
      ip: ip_address,
    });

    await user.save();
    res.send("Signup Successfull");
  });
});

userRouter.post("/login", async(req,res) =>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})

    if(!user){
        return res.send("User Not Found. Please Signup")
    }

    const hash = user.password
    const userId = user._id;
    bcrypt.compare(password, hash, function (err,result) {
        if(result){
            let token = jwt.sign({email,userId},"secert")
            return res.send({message:"Login Successfull", token:token})
        }
        else{
            return res.send("User Not Found")
        }
    })
})

module.exports = userRouter
