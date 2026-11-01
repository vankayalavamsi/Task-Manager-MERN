const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  homePage,
  registerUser,
  loginUser,
  profile,       // ← was imported but never routed — now it is
  logoutUser,
} = require("../controllers/userControllers");

router.get("/", homePage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, profile);
router.get("/logout", isAuthenticated, logoutUser);

module.exports = router;