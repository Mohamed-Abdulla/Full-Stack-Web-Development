const router = require("express").Router();
const {
  verify,
  verifyAndAuth,
  verifyAndAdmin,
} = require("../utils/verifyToken");
const {
  deleteUser,
  update,
  get,
  getAll,
  getUserStats,
} = require("../controllers/user");

//Update user details

router.patch("/:id", verifyAndAuth, update);

//delete user details

router.delete("/:id", verifyAndAuth, deleteUser);

//get user details

router.get("/find/:id", verifyAndAdmin, get);

//get all users details

router.get("/", verifyAndAdmin, getAll);

//get user stats
router.get("/stats", verifyAndAdmin, getUserStats);

module.exports = router;
