const express = require("express");
const router = express.Router();
const {
  registerUser,
  checkEmail,
  loginUser,
  getUsers,
  getMe,
  getUser,
  updateUser,
  confirmOtp,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.get("/confirmation/:token", checkEmail);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/me", protect, getMe);
router.post("/me", protect, updateUser);
router.get("/:id", getUser);
router.post("/otp/:token", confirmOtp);

module.exports = router;
