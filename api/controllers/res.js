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
  const { mealtype, locality, cusines, hcost, lcost, sort } = req.body;
  let filters = {};
  if (mealtype) {
    filters["menus.meal_type"] = mealtype;
  }
  if (locality) {
    filters.locality = locality;
  }

  if (cusines) {
    filters["menus.cusine"] = {
      $in: cusines,
    };
  }
  if (hcost) {
    filters["menus.cost"] = {
      $lt: hcost,
    };
  }
  if (lcost) {
    filters["menus.cost"] = {
      $gt: lcost,
    };
  }
  if (lcost && hcost) {
    filters["menus.cost"] = {
      $lt: hcost,
      $gt: lcost,
    };
  }
  console.log(filters);

  try {
    const result = await Restaurant.find(filters).sort({ "menus.cost": sort });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      Error: err,
    });
  }
};
