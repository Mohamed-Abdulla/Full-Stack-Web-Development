const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimelinePost,
  userPosts,
} = require("../controllers/posts");

//~create a posts

router.post("/", createPost);

//~update a posts

router.put("/:id", updatePost);

//~delete a post

router.delete("/:id", deletePost);

//~like/dislike a posts

router.put("/:id/like", likePost);

//~get a posts

router.get("/:id", getPost);

//~get timeline posts

router.get("/timeline/:userId", getTimelinePost);

//~get user's  all posts

router.get("/profile/:username", userPosts);

module.exports = router;

//update route using jwt
//and handle errors as well
