const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  createTask,
  getAllTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

router.post("/create", isAuthenticated, createTask);
router.get("/alltasks", isAuthenticated, getAllTask);
router.get("/task/:id", isAuthenticated, getOneTask);
router.put("/update/:id", isAuthenticated, updateTask);     // was POST
router.delete("/delete/:id", isAuthenticated, deleteTask);  // was GET

module.exports = router;