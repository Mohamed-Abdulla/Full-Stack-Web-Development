const router = require("express").Router();
const {
  createConvo,
  getConvo,
  findConvo,
} = require("../controllers/conversation");

//~new conv

router.post("/", createConvo);

//~get conv of a user

router.get("/:userId", getConvo);

//~get convo includes two user id

router.get("/find/:firstUserId/:secondUserId", findConvo);

module.exports = router;
