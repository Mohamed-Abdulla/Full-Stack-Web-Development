// import Menu from "../models/Menu.js";

// export const getResByMenu = async (req, res, next) => {
//   const { name, page } = req.query;
//   try {
//     const result = await Menu.find({
//       meal_type: name,
//     })
//       .populate("restaurantID")
// .skip((page - 1) * 2)
//       .limit(2);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
