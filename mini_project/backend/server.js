
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Unable to view tasks." });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, priority, status } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task name is required." });
    }

    const task = await Task.create({
      title: title.trim(),
      priority,
      status
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Unable to add task." });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, priority, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, priority, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Unable to update task." });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete task." });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running at http://localhost:5000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
