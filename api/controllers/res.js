import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";

export const createRes = async (req, res, next) => {
  const rest = new Restaurant(req.body);
  try {
    const savedRes = await rest.save();
    res.status(200).json(savedRes);
  } catch (err) {
    next(err);
  }
};
export const updateRes = async (req, res, next) => {
  try {
    const updatedres = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedres);
  } catch (error) {
    next(error);
  }
};

export const getCityList = async (req, res, next) => {
  const { c } = req.query;
  try {
    const result = await Restaurant.aggregate([
      { $match: { city_name: { $regex: c, $options: "i" } } },
      { $group: { _id: "$city_name" } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, city_name: "$_id" } },
    ]);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getResName = async (req, res, next) => {
  const { name } = req.query;
  try {
    const result = await Restaurant.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getResbyCity = async (req, res, next) => {
  const { city } = req.query;
  try {
    const result = await Restaurant.find({ city_name: city });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getResbyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Restaurant.findById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//~get res by menu

export const getResByMenu = async (req, res, next) => {
  const { name, page } = req.query;
  try {
    const result = await Restaurant.find({
      "menus.meal_type": name,
    })
      // .skip((page - 1) * 2)
      .limit(10);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const filterRes = async (req, res, next) => {
  const { mealtype, locality, cusine, hcost, lcost, sort = 1, page = 1 } = req.body;
  let filters = {};

  if (mealtype) {
    filters.mealtype_id = mealtype;
  }
  if (location) {
    filters.locality = locality;
  }
};
