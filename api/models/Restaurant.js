//~In moongose we use moongose schemas, because it doesnot js objs directly .but for developers,it hides complexity,
//~and it is easier to use by schema

import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    city_name: String,
    // city: String,
    // area: String,
    locality: String,
    thumb: String,
    address: String,
    contact_number: String,
    menus: [{ type: mongoose.Types.ObjectId, ref: "Menu" }],
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
