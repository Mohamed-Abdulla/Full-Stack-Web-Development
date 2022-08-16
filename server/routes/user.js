import express from "express";
import { getUsers } from "../controllers/user.js";
import { deleteUser, getUser, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/find/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
