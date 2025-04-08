const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error connecting server..."));

// User.updateMany(
//   { image: { $exists: false } }, // Find documents where `image` does not exist
//   { $set: { image: "" } }, // Set `image` to an empty string (or any default value you prefer)
//   { multi: true } // Update multiple documents
// )
//   .then((result) => {
//     console.log(`${result.nModified} documents updated`);
//   })
//   .catch((err) => {
//     console.error("Error updating documents:", err);
//   })
//   .finally(() => {
//     mongoose.connection.close(); // Close the connection
//   });

// Use routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/restaurant", restaurantRoutes); // Restaurant routes
app.use("/api/order", orderRoutes); // Restaurant routes

module.exports = app;
