const User = require("../models/User");
const CryptoJS = require("crypto-js");

//~Update user details

exports.update = async (req, res, next) => {
  //if user tries to change password,we need to encrypt it

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//~delete user details

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};

//~get user details

exports.get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...item } = user._doc;
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

//~get all users details

exports.getAll = async (req, res, next) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//~get user stats
exports.getUserStats = async (req, res, next) => {
  const today = new Date();
  const lastyear = new Date(today.setFullYear(today.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
