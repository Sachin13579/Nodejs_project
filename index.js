import express from "express";
import jwt from "jsonwebtoken";

// const express= require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const user = {
  id: "dnsnakdnksd",
  email: "johndoe@gmail.com",
  password: "bdbfbdjfsfdjdj123",
};

app.get("/", (req, res) => {
  res.send("hey you");
});
app.get("/forget-password", (req, res) => {
  res.render("forgotPasword");
});
app.post("/forget-password", (req, res, next) => {
  const { email } = req.body;
  // res.send(email)
  if (email !== user.email) {
    res.send("user not found");
    return;
  }
  const secret = "ndsjndjnsjdnjfn" + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "2m" });
  const link = `http://localhost:5000/reset-password/${user.id}/${token}`;
  console.log(link);
  res.send("password reset link is sent to your mail,pls check");
});
app.get("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  
  if (id !== user.id) {
    res.send("Invalid user");
  }
  const secret = "ndsjndjnsjdnjfn" + user.password;
  try {
    const payload = jwt.verify(token, secret);

    res.render("resetpassword", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message)
  }
});
app.post("/reset-password/:id/:token", (req,res) => {
    const{id,token}=req.params
    const { password1, password2 } = req.body;

    if (id !== user.id) {
        res.send("Invalid user");
      }
      const secret = "ndsjndjnsjdnjfn" + user.password;
      try {
        const payload = jwt.verify(token, secret);
        user.password=password1
    
        res.send(user)
      } catch (error) {
        console.log(error.message);
        res.send(error.message)
      }

});
app.listen(5000, (req, res) => {
  console.log("🐱‍🏍 runniing on port : 5000");
});
