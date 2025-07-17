const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers")

router.post("/register", authControllers.validateRegister, authControllers.register("user") )
router.post("/verify-code", authControllers.verifyEmail);
router.post("/login", authControllers.validateLogin, authControllers.login);
router.post("/forget-password", authControllers.forgetPassword);
router.post("/reset-password", authControllers.resetPassword);

module.exports = router;
