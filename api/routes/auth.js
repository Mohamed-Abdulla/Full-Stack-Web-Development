const router = require("express").Router();
const { register, login } = require("../controllers/auth");

//~Register

router.post("/register", register);

//~login

router.post("/login", login);

module.exports = router;
