const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the menu item
  maxItems: { type: Number, required: true }, // Maximum number of items
  price: { type: String, required: true }, // Price of the item
  qty: { type: Number, default: 0 }, // Quantity, default is 0
  image: { type: String, required: true }, // Image URL for the item
});

const RestaurantDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    description: { type: String, required: false },
    rating: String,
    image: { type: String, required: true },
    menu: [MenuItemSchema],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Order collection
        ref: "Order", // Name of the referenced model
      },
    ],
  },
  {
    collection: "Restaurant",
  }
);

module.exports = mongoose.model("Restaurant", RestaurantDetailsSchema);
