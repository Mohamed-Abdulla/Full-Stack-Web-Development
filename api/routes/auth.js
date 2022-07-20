const router = require("express").Router();
const { register, login } = require("../controllers/auth");

//~REGISTER

router.post("/register", register);

//~login

router.post("/login", login);

module.exports = router;
