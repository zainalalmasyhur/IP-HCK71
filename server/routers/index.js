const express = require("express");
const router = express.Router();

const LoginController = require(`../controllers/LoginController`);
const RegisterController = require(`../controllers/RegisterController`);
const { errorHandler } = require(`../middleware/errorhandler`);

router.post("/login", LoginController.login);
router.post("/login-google", LoginController.loginByGoogle);
router.post("/register", RegisterController.Register);

router.use(errorHandler);

module.exports = router;
