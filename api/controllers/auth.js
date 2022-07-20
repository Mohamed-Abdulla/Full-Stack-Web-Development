const User = require("../models/User");
const bcrypt = require("bcrypt");
//~REGISTER
exports.register = async (req, res) => {
  try {
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and res
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
//~login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user) {
      res.status(400).json("user not found");
    } else if (!validPassword) {
      res.status(400).json("invalid password");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
