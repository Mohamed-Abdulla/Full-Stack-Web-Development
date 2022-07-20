import express from "express";
import {
  addVideo,
  deleteVideo,
  updateVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from "../controllers/videos.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get a video
router.get("/find/:id", getVideo);

//add a view
router.put("/view/:id", addView);

//get trending videos
router.get("/trend", trend);

//get random videos
router.get("/random", random);

//get subscribed videos
router.get("/sub", verifyToken, sub);

//get videos by tag
router.get("/tags", getByTag);

//search videos
router.get("/search", search);

export default router;
