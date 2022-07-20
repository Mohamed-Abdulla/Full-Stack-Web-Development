//~importing
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/whatsapp_routes.js";
import Pusher from "pusher";
import cors from "cors";

//~app config
const app = express();
dotenv.config();

const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1405650",
  key: "1f5baaae41ce49ad1391",
  secret: "e49d7aacdc9c18219f61",
  cluster: "ap2",
  useTLS: true,
});

//~DB config

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//if it disconnects, it will reconnect
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//~middleware
app.use(cors());
app.use(express.json());
app.use("/messages", routes);

//~Pusher

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to mongodb");
  //watch this collection
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch(); //if some thing changes in db,fire off pusher
  changeStream.on("change", (change) => {
    // console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        // message: messageDetails, //this sent full details of the message
        name: messageDetails.name,
        message: messageDetails.message, // this sends only message
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering  pusher");
    }
  });
});

//~listen

app.listen(port, () => {
  connect();
  console.log(`Server started on port ${port}`);
});
