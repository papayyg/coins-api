const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authMiddleware.authenticateToken, authController.login);
router.post("/verify", authMiddleware.authenticateToken, authController.verifyToken);

module.exports = router;
