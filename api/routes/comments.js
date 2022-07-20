import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comments.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
