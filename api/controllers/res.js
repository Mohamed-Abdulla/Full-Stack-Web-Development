import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";

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
    const result = await Restaurant.find({ "menus.meal_type": name })

      // .skip((page - 1) * 2)
      .limit(2);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const sortByRange = async (req, res, next) => {
  const { range } = req.query;
  try {
    if (range === "lowToHigh") {
      let result = await Menu.find()
        .sort({ cost: 1 })
        .populate("restaurantID")
        // .skip((page - 1) * 2)
        .limit(2);

      res.status(200).json(result);
    } else {
      let result = await Menu.find()
        .sort({ cost: -1 })
        .populate("restaurantID")
        // .skip((page - 1) * 2)
        .limit(2);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};
