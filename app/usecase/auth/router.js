const express = require("express")
const router = express.Router()

const { register, login, refreshToken } = require("./controller")
const auth = require("../../middleware/auth")
router.post("/login", login)
router.post("/register", auth, register)
router.get("/refresh-token", auth, refreshToken)

module.exports = router