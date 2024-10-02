const express = require("express");
const router = express.Router();
const {
  register,
  login,
  findUserById,
  getUserFromToken,
} = require("../controller/authController.cjs");

router.post("/register", register);
router.post("/login", login);
router.get("/find-user/:id", findUserById);
router.get("/get-user", getUserFromToken);

module.exports = router;
