// server/api.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserbyId,
  addUser,
  deleteUser,
  updateUser,
  getRoleByUserId,
  getFirstNameByUserId,
  getFullNameByUserId,
} = require("./controllers/user"); // Import your functions

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserbyId(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... Add other endpoints for addUser, deleteUser, updateUser, getRoleByUserId, getFirstNameByUserId, getFullNameByUserId

module.exports = router;
