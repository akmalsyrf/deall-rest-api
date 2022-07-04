const express = require("express")
const router = express.Router()

const { getAllUser, getUserById, updateUser, deleteUser } = require("./controller")
const auth = require("../../middleware/auth")
router.get("/users", getAllUser)
router.get("/user/:id", getUserById)
router.put("/user/:id", auth, updateUser)
router.delete("/user/:id", auth, deleteUser)

module.exports = router