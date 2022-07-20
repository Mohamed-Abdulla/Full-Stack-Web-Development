const router = require("express").Router();
const {
  create,
  update,
  deleteCart,
  get,
  getAll,
} = require("../controllers/cart");
const {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} = require("../utils/verifyToken");

//~Create
router.post("/", verify, create);

//~Update cart details
router.put("/:id", verifyAndAuth, update);

//~delete Cart details
router.delete("/:id", verifyAndAuth, deleteCart);

//~get user cart details
router.get("/find/:id", verifyAndAuth, get);

//~get all Cart
router.get("/", verifyAndAdmin, getAll);

module.exports = router;
