const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    ref: "UserInfo", // Name of the referenced model
    required: true, // Every order must be linked to a user
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Restaurant collection
    ref: "Restaurant", // Name of the referenced model
    required: true, // Every order must be linked to a restaurant
  },
  items: [
    {
      title: { type: String, required: true }, // Name of the item
      qty: { type: Number, required: true }, // Quantity of the item
      price: { type: String, required: true }, // Price of the item
      _id: { type: String, required: true }, // Price of the item
      image: String, // Price of the item
      maxItems: Number, // Price of the item
    },
  ],
  totalAmount: { type: Number, required: true }, // Total amount of the order
  status: {
    type: String,
    enum: ["Success", "Failed", "Pending"], // Allowed statuses
    default: "Pending", // Default status
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Create and export the Order model
module.exports = mongoose.model("Order", OrderSchema);
