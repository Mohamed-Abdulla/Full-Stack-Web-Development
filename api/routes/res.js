import express from "express";
import {
  getCityList,
  getResName,
  getResbyId,
  getResbyCity,
  sortByRange,
  getResByMenu,
  createRes,
  updateRes,
  filterRes,
} from "../controllers/res.js";

const router = express.Router();

//~create res
router.post("/create", createRes);

//~update res
router.patch("/update/:id", updateRes);

//~get city list

router.get("/city/", getCityList);

//~get restaurant list

router.get("/search", getResName);
router.get("/find", getResbyCity);

//~get res by id
router.get("/find/:id", getResbyId);
router.get("/find/menu/query", getResByMenu);

//~filters
router.get("/filter", filterRes);

//~sort by price

router.get("/sort", sortByRange);

export default router;
