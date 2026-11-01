const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");

module.exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const newTask = await taskModel.create({
      title,
      description,
      status,     // defaults to "Pending" if not sent
      priority,   // defaults to "Medium" if not sent
      dueDate,
      assignedUserId: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully!",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FIXED: only returns the logged-in user's tasks (was returning everyone's)
module.exports.getAllTask = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ assignedUserId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully.",
      count: tasks.length,
      tasks, // empty array is fine — frontend can show "no tasks yet"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getOneTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "No task found." });
    }

    // FIXED: users can only read their own tasks
    if (task.assignedUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // FIXED: guard against null assignedUserId (old tasks won't crash)
    if (
      task.assignedUserId &&
      task.assignedUserId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();
    res.status(200).json({ message: "Task updated successfully.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (
      task.assignedUserId &&
      task.assignedUserId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};