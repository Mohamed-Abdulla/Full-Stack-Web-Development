const router = require("express").Router();
const { createMessage, getMessage } = require("../controllers/message");

//~add

router.post("/", createMessage);

//~get

router.get("/:conversationId", getMessage);

module.exports = router;
