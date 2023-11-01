const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/signups");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://saniyaswapnilmehta:54321@cluster0.ox96hsl.mongodb.net/todo"
);

app.post("/register", async (req, res) => {
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Email is already registered. Please Login" });
  } else {
    userModel
      .create(req.body)
      .then((signups) => res.json(signups))
      .catch((err) => res.json(err));
  }
});

app.listen(4001, () => {
  console.log("Server is connected and running");
});
