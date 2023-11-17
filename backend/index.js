const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/signups");
const bcrypt = require("bcryptjs");
const List = require("./model/list");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://saniyaswapnilmehta:54321@cluster0.ox96hsl.mongodb.net/todo?retryWrites=true&w=majority"
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const userData = {
      name: user.name,
      email: user.email,
      list: user.list,
    };
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res
        .status(401)
        .json({ error: "The password is incorrect. Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });
    } else {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user with the hashed password
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };

      // Save the user to the database
      const createdUser = await userModel.create(newUser);

      // Respond with the created user
      res.json(createdUser);
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const { title, description, email } = req.body;

    // Find the user based on the provided email
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      // Create a new list
      const newList = new List({ title, description });

      // Set the user reference for the list
      newList.user = existingUser._id;

      // Save the list
      await newList.save();

      // Update the user's list with the newly created list
      existingUser.list.push(newList._id);
      await existingUser.save();

      // Send the response
      res.status(200).json({ list: newList });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4001, () => {
  console.log("Server is connected and running");
});
