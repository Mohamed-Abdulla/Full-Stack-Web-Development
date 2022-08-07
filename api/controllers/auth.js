import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//~Register

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      name: `${req.body.firstName} ${req.body.lastName}`,
      password: hash,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

//~Login

export const login = async (req, res, next) => {
  try {
    //checking user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    //checking password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(401, "Password is incorrect"));
    }
    //if correct, create token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );
    //setting token in to cookies using cookie-parser
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        details: { ...otherDetails },
        isAdmin,
      });
  } catch (error) {
    next(error);
  }
};
