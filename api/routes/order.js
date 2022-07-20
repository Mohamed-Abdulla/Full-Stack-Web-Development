const router = require("express").Router();
const {
  create,
  update,
  deleteOrder,
  get,
  getAll,
  getIncome,
} = require("../controllers/order");
const {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} = require("../utils/verifyToken");

//~Create

router.post("/", verify, create);

//~Update Order details

router.put("/:id", verifyAndAdmin, update);

//~delete order details

router.delete("/:id", verifyAndAdmin, deleteOrder);

//~get user order details

router.get("/find/:id", verifyAndAuth, get);

//get all Order

router.get("/", verifyAndAdmin, getAll);

//~get monthly income

router.get("/income", verifyAndAdmin, getIncome);

module.exports = router;
