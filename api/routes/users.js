const {
  updateUser,
  deleteUser,
  getUser,
  searchUser,
  following,
  followers,
  follow,
  unfollow,
} = require("../controllers/users");

const router = require("express").Router();

//~update user

router.patch("/:id", updateUser);

//~delete user

router.delete("/:id", deleteUser);

//~get user

router.get("/", getUser);

//~get filter user for search

router.get("/search", searchUser);

//~get following

router.get("/friends/:userId", following);

//~get followers

router.get("/followers/:userId", followers);

//~follow a user

router.put("/:id/follow", follow);

//~unfollow a user

router.put("/:id/unfollow", unfollow);

module.exports = router;
