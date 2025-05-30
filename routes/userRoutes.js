const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

router.get("/", userController.getAllUsers);
router.get("/get", authMiddleware, userController.getUserByEmail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;