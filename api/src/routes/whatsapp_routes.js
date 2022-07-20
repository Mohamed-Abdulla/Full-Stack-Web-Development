import express from "express";
import controller from "../controllers/wsp_controller.js";

//create router
const router = express.Router();

router.get("/sync", controller.getMessages);
router.post("/new", controller.postMessages);

export default router;
