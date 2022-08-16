import express from "express";

import { login, register, googleAuth } from "../controllers/auth.js";

const router = express.Router();
//~Register

router.post("/register", register);

//~login

router.post("/login", login);

//~GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
