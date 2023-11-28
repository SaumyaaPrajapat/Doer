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
  "mongodb+srv://priyaanukanksha:Anu123@cluster0.3jf2rdy.mongodb.net/todo?retryWrites=true&w=majority"
);

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { password, ...others } = user._doc;
      return res.status(200).json({ others });
    } else {
      return res
        .status(401)
        .json({ error: "The password is incorrect. Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//register
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

// add task
app.post("/addTask", async (req, res) => {
  try {
    const { title, description, id } = req.body;

    // Find the user based on the provided email
    const existingUser = await userModel.findById(id);

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

// update task
app.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } // This option ensures that you get the updated document
    );

    if (updatedList) {
      res.status(200).json({ updatedList });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//complete task
app.put("/updateTask/:id", async (req, res) => {
  try {
    const { isTaskComplete } = req.body;

    // Find the task by id and update its isTaskComplete field
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isTaskComplete },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete task
app.delete("/getTasks/:id", async (req, res) => {
  try {
    const { id } = req.body;

    //Find the user based on the provided email
    const existingUser = await userModel.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Deleted" })
      );
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// getTasks
app.get("/getTasks/:id", async (req, res) => {
  try {
    // Check if req.params.id is not null
    if (!req.params.id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const lists = await List.find({ user: req.params.id }).sort({ _id: -1 });

    if (lists.length > 0) {
      res.status(200).json({ lists });
    } else {
      res.status(404).json({ message: "No tasks found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4001, () => {
  console.log("Server is connected and running");
});
