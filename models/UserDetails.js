const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    image: String,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Order collection
        ref: "Order", // Name of the referenced model
      },
    ],
  },
  {
    collection: "UserInfo",
  }
);

//mongoose.model("UserInfo", UserDetailsSchema);
module.exports = mongoose.model("UserInfo", UserDetailsSchema);
