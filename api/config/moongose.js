import mongoose from "mongoose";

const connection_url =
  "mongodb+srv://test:test@cluster0.oidoo.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
