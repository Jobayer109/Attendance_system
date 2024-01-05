const userController = require("../controllers/userController");

const router = require("express").Router();

// Get user by ID
router.get("/:userId", userController.getUserByID);

// Get all users
router.get("/", userController.getUsers);

// Create new user
router.post("/", userController.postUser);

// Update all info of an user
router.put("/:userId", () => {});

// Update single portion of info
router.patch("/:userId", () => {});

// Delete user by  ID
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
