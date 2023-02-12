require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const ItemModel = require("./model/item.model");

const app = express();

const connection_string = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 4000;

//create connection to mongodb database
mongoose.set("strictQuery", true);
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  // Start server only if connected to database
  .then(() => {
    app.listen(PORT, async () => {
      console.log("Blucargoo Api is running on port :", PORT);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Server is Live");
});

//Add tracker to a good
app.post("/add-to-track", async (req, res) => {
  const {
    senderName,
    recieverAddress,
    senderEmail,
    senderPhone,
    recieverName,
    recieverEmail,
    shippingDuration,
    shippingDate,
    comingFrom,
    trackingNo,
  } = req.body;
  try {
    if (!trackingNo) {
      return res.status(200).send({
        status: false,
        message: "Invalid parameter",
      });
    }
    const newItem = new ItemModel({
      senderName,
      recieverAddress,
      senderPhone,
      senderEmail,
      recieverEmail,
      recieverName,
      shippingDate,
      shippingDuration,
      comingFrom,
      trackingNo,
    });
    const savedItem = newItem.save();

    if (savedItem) {
      return res.status(200).send({
        status: true,
        message: "tem added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: `An error - ${error} occured`,
    });
  }
});

//login admin
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
let 
  try {
    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.password
    ) {
      return res.status(500).send({
        status: false,
        message: "Unauthorized Personnel, What are you doing here?",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: `An error - ${error}. Contact the Admin`,
    });
  }
});
//Get Tracked goods
app.get("/item/:trackingNo", async (req, res) => {
  const { trackingNo } = req.params;
  const itemInstance = await ItemModel.findOne({ trackingNo });
  if (!itemInstance) {
    return res.status(200).send({
      status: false,
      payload: {},
    });
  }
  return res.status(200).send(itemInstance);
});
