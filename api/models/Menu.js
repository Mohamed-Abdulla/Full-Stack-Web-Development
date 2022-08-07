import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: String, //icecream
    meal_type: String, //snack
    cusine: String, //fastfood
    cost: String, //200
    restaurantID: [{ type: mongoose.Types.ObjectId, ref: "Restaurant" }], //defining relationship to restaurant
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
