import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

//this is es6 syntax of exporting a function
export default mongoose.model("messagecontent", whatsappSchema);
