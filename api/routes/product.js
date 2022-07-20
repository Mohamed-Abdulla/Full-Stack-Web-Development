const router = require("express").Router();
const {
  create,
  update,
  deleteProduct,
  get,
  getAll,
  search,
} = require("../controllers/product");
const {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} = require("../utils/verifyToken");

//~Create

router.post("/", verify, create);

//~Update Order details

router.patch("/:id", verifyAndAdmin, update);

//~delete order details

router.delete("/:id", verifyAndAdmin, deleteProduct);

//~get product details

router.get("/find/:id", get);

//get all product details

router.get("/", getAll);

//get product by search
router.get("/search", search);

module.exports = router;
