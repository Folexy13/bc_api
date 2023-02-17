const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  senderName: {
    type: String,
    required: true,
  },
  recieverAddress: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  senderPhone: {
    type: String,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
  recieverEmail: {
    type: String,
    required: true,
  },
  packageShipped: {
    type: String,
    required: true,
  },
  shippingDuration: {
    type: Number,
    required: true,
  },
  shippingDate: {
    type: String,
    required: true,
  },
  comingFrom: {
    type: String,
    required: true,
  },
  trackingNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  location: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
