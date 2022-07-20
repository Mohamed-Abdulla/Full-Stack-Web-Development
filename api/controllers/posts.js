const Post = require("../models/Post");
const User = require("../models/User");

//~create a posts
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).send(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
//~update a posts

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send("Your post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//~delete a posts

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId) {
      await post.deleteOne();
      res.status(200).send("Your post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//~like/dislike a posts

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("you liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("you disliked this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//~get a posts
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//~get timeline posts

exports.getTimelinePost = async (req, res) => {
  try {
    //get the current user
    const currentUser = await User.findById(req.params.userId);
    //then fetch all this user post in to this array
    const userPosts = await Post.find({ userId: currentUser._id });
    //fetch all their friends post
    //if you are fetching using loop or map,use promise.all
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    //it takes all friend's posts and concat with userpost
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};
//~get user's  all posts

exports.userPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update route using jwt
//and handle errors as well
